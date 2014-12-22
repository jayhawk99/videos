var Test = Test || {}; //namespace

Test.viewmodel = (function () {

    var self = this;

    self.testserver = window.testServer; //variable "testServer" declared in the javascript embedded in the markup of the view, the TestServerModel is defined in TestServer.js

    self.colorArray = ko.observableArray([]);

    self.sizeArray = ko.observableArray([]);

    self.lineItems = ko.observableArray([]);
    
    //used for holding a testItem when we edit or add one to the lineItems observable array
    self.testItem = { Id: 0, Description: '', Color: { Id: 0, Description: '' }, Size: { Id: 0, Description: '' } };

    self.DdlWrapper = function (item) {
        this.Name = ko.observable(item.Name);
        this.Id = ko.observable(item.Id);
        return this;
    };

    self.TestItemWrapper = function (item) {
        this.ColorId = ko.observable(item.Color.Id);
        this.ColorDescription = ko.observable(item.Color.Description);
        this.SizeDescription = ko.observable(item.Size.Description);
        this.SizeId = ko.observable(item.Size.Id);
        this.Id = ko.observable(item.Id);
        this.Description = ko.observable(item.Description);
        return this;
    };

    self.refreshData = function () {
        $.when(testserver.getColors(), testserver.getSizes(), testserver.getLineItems()).done(function (colorData, sizeData, lineitemsData) {
            fillColorArray((colorData && colorData[0]) ? colorData[0] : null);
            fillSizeArray((sizeData && sizeData[0]) ? sizeData[0] : null);
            fillLineItemsArray((lineitemsData && lineitemsData[0]) ? lineitemsData[0] : null);
        });
    };
    
    self.fillArray = function (data, arr) {
        //empty the array so we don't get duplicate data rows
        arr([]);

        if (data === null)
            return;

        //load up the data
        var underlyingArray = arr();
        ko.utils.arrayMap(data, function (item) {
            //add the data to the underlying array one row at a time
            underlyingArray.push(new DdlWrapper(item));
        });
        //Now notify the UI that the data has been changed so events to which the UI may be subscribed will fire once.
        arr.valueHasMutated();
    };

    self.fillColorArray = function (data) {
        self.fillArray(data, colorArray);
    };

    self.fillSizeArray = function (data) {
        self.fillArray(data, sizeArray);
    };

    self.fillLineItemsArray = function (data) {
        //empty the array so we don't get duplicate data rows
        lineItems([]);

        if (data === null)
            return;

        //load up the lineItems
        //Grab the underlying array so that all the events to which the UI is subscribed don't keep firing over and over.
        var underlyingArray = lineItems();
        ko.utils.arrayMap(data, function (item) {
            //add the data to the underlying array one row at a time
            underlyingArray.push(new TestItemWrapper(item));
        });
        //Now notify the UI that the data has been changed so events to which the UI may be subscribed will fire once.
        lineItems.valueHasMutated();

    };
    self.clearEdit = function () {
    	ko.cleanNode($("#itemEditOutput").get(0));
    	$("#itemEditOutput").hide();
    };

    self.showItemForEdit = function (itm) {
        self.testItem.Description = itm.Description;
        self.testItem.Id = itm.Id;
        self.testItem.Color.Id = itm.Color.Id;
        self.testItem.Size.Id = itm.Size.Id;
        $("#itemEditOutput").show();
    	try {
    		ko.applyBindings(self, $("#itemEditOutput").get(0));
    	}
    	catch (e) { }
    };
    self.editItem = function () {
        var id = getId(this);
        testserver.getLineItem(id).done(showItemForEdit);
    };
    
    self.createItem = function () {
        self.testItem.Id = 0;
        self.testItem.Color.Id = undefined;
        self.testItem.Size.Id = undefined;
        self.testItem.Description = '';
        showItemForEdit(self.testItem);
    };
    self.deleteItem = function () {
        var id = getId(this);
        testserver.deleteItem(id).done(refreshData);
    };
    self.wireEvents = function () {
        $(document).on("click", "#clearEdit", clearEdit);
        $(document).on("click", ".editItem", editItem);
        $(document).on("click", "#saveItem", saveItem);
        $(document).on("click", "#createItem", createItem);
        $(document).on("click", ".deleteItem", deleteItem);
    };

    self.getId = function (element) {
        return $(element).parents("tr").attr("data-id");
    };
    
    self.saveItem = function () {
        self.testItem.Id = $("#id").val();
        self.testItem.Description = $("#description").val();
        self.testItem.Color.Id = $("#colAddEdit").val();
        self.testItem.Size.Id = $("#sizAddEdit").val();

        var operation;
        if (testItem.Id != "0") {
            operation = testserver.updateItem(self.testItem);
        } else {
            operation = testserver.addItem(self.testItem);
        }
        operation.done(refreshData, clearEdit);
        return false;
    };

    self.debugInfo = ko.computed(function () { return ko.toJSON(lineItems, null, 2); });
    self.colorInfo = ko.computed(function () { return ko.toJSON(colorArray, null, 2); });
    self.sizeInfo = ko.computed(function () { return ko.toJSON(sizeArray, null, 2); });

    $(function () {
        self.wireEvents();
        self.refreshData();
        ko.applyBindings(self, $("#testTableOutput").get(0));
        ko.applyBindings(self, $("#dbgInfo").get(0));
        ko.applyBindings(self, $("#sizInfo").get(0));
        ko.applyBindings(self, $("#colInfo").get(0));
    });
    //return {
        //expose public items here
    //};
}());