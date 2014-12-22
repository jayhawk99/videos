var TestServerModel = (function (lineitemApiUrl, colorApiUrl, sizeApiUrl) {

    var self = this;
    
    $(document).ajaxError(function (event, xhr) {
        alert("WebAPI Error :: status : " + xhr.status + " -- status text : " + xhr.statusText);
    });

    this.getLineItems = function () {
        return $.ajax(lineitemApiUrl);
    };

    this.getLineItem = function (id) {
        return $.ajax(lineitemApiUrl + "/" + id);
    };
    
    //get Color dropdown data
    this.getColors = function () {
        return $.ajax(colorApiUrl);
    };
    
    //get Size dropdown data
    this.getSizes = function () {
        return $.ajax(sizeApiUrl);
    };
    
    this.deleteItem = function (id) {
        return $.ajax(lineitemApiUrl + "/" + id, {
            type: "DELETE"
        });
    };
    
    this.updateItem = function (itm) {
        return $.ajax(lineitemApiUrl + "/" + itm.Id, {
            type: "PUT",
            data: itm
        });
    };

    this.addItem = function (itm) {
        return $.ajax(lineitemApiUrl, {
            type: "POST",
            data: itm
        });
    };

    return {
        getLineItems: self.getLineItems,
        getLineItem: self.getLineItem,
        getColors: self.getColors,
        getSizes: self.getSizes,
        deleteItem: self.deleteItem,
        updateItem: self.updateItem,
        addItem: self.addItem
    };

});