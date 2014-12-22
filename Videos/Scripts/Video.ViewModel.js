var Video = Video || {}; //namespace
Video.viewmodel = (function () {

    var self = this; //anywhere in this javascript you see "self" it refers to Video.viewmodel

    self.videoserver = window.videoServer; //variable "videoServer" declared in the javascript embedded in the markup of the view, VideoServerM is defined in VideoServer.js

    self.videos = ko.observableArray([]);

    self.categoryArray = ko.observableArray([]);

    //used for holding a video when we edit or add one to the videos observable array
    self.video = { Id: 0, Title: '', Length: 0, Category: { Id: 0, Description: "" } };

    //used to add items to the videos observable array and make each member of the array observable also
    self.VideoItemWrapper = function (item) {
        this.Id = ko.observable(item.Id);
        this.Title = ko.observable(item.Title);
        this.Length = ko.observable(item.Length);
        this.Category = ko.observable(item.Category.Description);
        this.CategoryId = ko.observable(item.CategoryId);
        return this;
    };

    self.CategoryItemWrapper = function (item) {
        this.Id = ko.observable(item.Id);
        this.Description = ko.observable(item.Description);
        return this;
    };

    self.showVideoForEdit = function (vid) {
        self.video.Title = vid.Title;
        self.video.Id = vid.Id;
        self.video.Length = vid.Length;
        self.video.Category.Id = vid.Category.Id;
        $("#videoEditOutput").show();

        ko.cleanNode($("#videoEditOutput").get(0));
        ko.applyBindings(self, $("#videoEditOutput").get(0));
        //$("#editform").validate({ submitHandler: self.saveVideo });
        $('input[type="submit"], input[type="button"]').button();
        $("#editform").validate({
            submitHandler: self.saveVideo,
            rules: {
                cat: {
                     required: true
                },
                title: {
                    required: true,
                    maxlength: 100
                },
                length: {
                    required: true,
                    digits: true,
                    max: 200,
                    min: 1
                }
            },
            messages: {
                cat: {
                    required: "Category required"
                },
                length: {
                    required: "Please specify the length",
                    max: "200 maximum",
                    min: "1 minimum",
                    digits: "Must be digits"
                },
                title: {
                    required: "Title required",
                    maxlength: "Length must be less than 100 characters"
                }
            }
        });
    };

    self.editVideo = function () {
        var id = getId(this);
        self.videoserver.getVideo(id).done(showVideoForEdit);
    };

    self.createVideo = function () {
        self.video.Title = '';
        self.video.Id = 0;
        self.video.Length = 0;
        self.video.Category.Id = 0;
        showVideoForEdit(self.video);
    };

    self.deleteVideo = function () {
        var id = getId(this);
    	self.videoserver.deleteVideo(id).done(refreshVideos);
    };

    self.clearEdit = function () {
        $("#videoEditOutput").hide();
    };

    self.showSelection = function () {
        alert(self.selectedValue() + ' ' + self.selectedText());
        return false;
    };

    self.vinScore = function() {
        var value = $('#gcid').val();
        $('#vinscorespan1').vinscore(value);
        return false;
    };

    self.saveVideo = function () {
        self.video.Id = $("#id").val();
        self.video.Length = $("#length").val();
        self.video.Title = $("#title").val();
        self.video.CategoryId = $("#cat").val();
        var operation;
        if (self.video.Id !== "0") {
            operation = self.videoserver.updateVideo(self.video);
        } else {
            operation = self.videoserver.addVideo(self.video);
        }
        operation.done(self.refreshVideos, self.clearEdit);
        return false;
    };

    self.wireEvents = function () {
        $(document).on("click", "#clearEdit", self.clearEdit);
        $(document).on("click", ".editVideo", self.editVideo);
        $(document).on("click", "#createVideo", self.createVideo);
        $(document).on("click", ".deleteVideo", self.deleteVideo);
        $(document).on("click", ".showbutton", self.showSelection);
        $(document).on("click", "#btnVinScore", self.vinScore);
        
    };

    self.getId = function (element) {
        return $(element).parents("tr").attr("data-id");
    };

    self.debugInfo = ko.computed(function () { return ko.toJSON(self.videos, null, 2); });

    self.selectedValue = ko.observable('');

    self.selectedText = function () {
        return ko.utils.arrayFirst(videos(), function (itm) {
            return itm.Id() === selectedValue();
        }).Title();
    };

    self.loadCategories = function (data) {

        //empty the array so we don't get duplicate data rows
        self.categoryArray([]);

        if (data === null)
            return;

        //Grab the underlying array so that all the events to which the UI is subscribed don't keep firing over and over.
        var underlyingArray = self.categoryArray();

        ko.utils.arrayMap(data, function (item) {
            //add the data to the underlying array one row at a time
            underlyingArray.push(new CategoryItemWrapper(item));
        });

        //Now notify the UI that the data has been changed so events to which the UI may be subscribed will fire once.
        self.categoryArray.valueHasMutated();
    };

    self.showAllVideos = function (data) {

        //empty the array so we don't get duplicate data rows
        self.videos([]);

        if (data === null)
            return;

        //Grab the underlying array so that all the events to which the UI is subscribed don't keep firing over and over.
        var underlyingArray = self.videos();

        ko.utils.arrayMap(data, function (item) {
            //add the data to the underlying array one row at a time
            underlyingArray.push(new VideoItemWrapper(item));
        });

        //Now notify the UI that the data has been changed so events to which the UI may be subscribed will fire once.
        self.videos.valueHasMutated();

    };

    self.initialDataLoad = function () { //called ONCE! When the page initally loads 
        $.when(self.videoserver.getCategories(), self.videoserver.getVideos()).done(function (c, v) {
            self.loadCategories((c && c[0]) ? c[0] : null);
            self.showAllVideos((v && v[0]) ? v[0] : null);
        	//bind the data to the UI elements
            //only do the ones that should show...if you just do a ko.applyBindings(self) the VideoEditOutput section will show on load
        	//and that is not what we want......
      		ko.applyBindings(self, $("#videoTableOutput").get(0));
       		ko.applyBindings(self, $("#videoDropDownOutput").get(0));
       		ko.applyBindings(self, $("#dbgInfo").get(0));
       		ko.applyBindings(self, $(".showbutton").get(0));
            $('.editVideo, .showbutton, #btnVinScore, #createVideo, #showVideo, #clearEdit, .deleteVideo').button();
        });

        self.refreshVideos = function () { //called after inserts, edits, or deletes to update the data in the vm
        	$.when(self.videoserver.getCategories(), self.videoserver.getVideos()).done(function (c, v) {
        		self.loadCategories((c && c[0]) ? c[0] : null);
        		self.showAllVideos((v && v[0]) ? v[0] : null);
        	});
        };
    };
    //document.onready() must be before return statement if inside of the Video.viewmodel
    $(function () {
        wireEvents();
        initialDataLoad();
    });
    //return {
    //expose public items here if necessary
    //};
}());

