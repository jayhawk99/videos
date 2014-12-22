var VideoServer = (function (videoApiUrl, categoryApiUrl) {

    var self = this;
    
    $(document).ajaxError(function (event, xhr) {
        alert("WebAPI Error :: status : " + xhr.status + " -- status text : " + xhr.statusText);
    });

    self.getVideos = function () {
        return $.ajax(videoApiUrl);
    };
    
    self.getVideo = function (id) {
        return $.ajax(videoApiUrl + "/" + id);
    };

    self.getCategories = function () {
        return $.ajax(categoryApiUrl);
    };
    
    self.getCategory = function (id) {
        return $.ajax(categoryApiUrl + "/" + id);
    };

    self.updateVideo = function (video) {
        return $.ajax(videoApiUrl + "/" + video.Id, {
            type: "PUT",
            data: video
        });
    };

    self.addVideo = function (video) {
        return $.ajax(videoApiUrl, {
            type: "POST",
            data: video
        });
    };

    self.deleteVideo = function (id) {
        return $.ajax(videoApiUrl + "/" + id, {
            type: "DELETE"
        });
    };

    return {
        deleteVideo: self.deleteVideo,
        addVideo: self.addVideo,
        updateVideo: self.updateVideo,
        getVideos: self.getVideos,
        getVideo: self.getVideo,
        getCategories: self.getCategories,
        getCategory: self.getCategory
    };

});