var SearchServerModel = (function () {
    function SearchServerModel(categoryApiUrl, colorApiUrl, sizesApiUrl, typeApiUrl, preferenceApiUrl) {
        this.categoryApiUrl = categoryApiUrl;
        this.colorApiUrl = colorApiUrl;
        this.sizesApiUrl = sizesApiUrl;
        this.typeApiUrl = typeApiUrl;
        this.preferenceApiUrl = preferenceApiUrl;
        this.verbs = {
            'read': 'GET',
            'update': 'PUT',
            'delete': 'DELETE',
            'create': 'POST'
        };
        this.getColors = function () {
            return jQuery.ajax({
                url: this.colorApiUrl,
                type: this.verbs.read
            });
        };
        this.getCategories = function () {
            return jQuery.ajax({
                url: this.categoryApiUrl,
                type: this.verbs.read
            });
        };
        this.getCategory = function (id) {
            return jQuery.ajax({
                url: this.categoryApiUrl + '/' + id,
                type: this.verbs.read
            });
        };
        this.getTypes = function () {
            return jQuery.ajax({
                url: this.typeApiUrl,
                type: this.verbs.read
            });
        };
        this.getType = function (id) {
            return jQuery.ajax({
                url: this.typeApiUrl + '/' + id,
                type: this.verbs.read
            });
        };
        this.getColor = function (id) {
            return jQuery.ajax({
                url: this.colorApiUrl + '/' + id,
                type: this.verbs.read
            });
        };
        this.getSize = function (id) {
            return jQuery.ajax({
                url: this.sizesApiUrl + '/' + id,
                type: this.verbs.read
            });
        };
        this.getSizes = function () {
            return $.ajax({
                url: this.sizesApiUrl,
                type: this.verbs.read
            });
        };
        this.setSettingValue = function (userPreferenceSetting, value) {
            var returnValue = false;
            jQuery.ajax({
                url: this.preferenceApiUrl + '?value=' + encodeURIComponent(value) + '&userpreferenceid=' + encodeURIComponent(userPreferenceSetting),
                data: null,
                type: this.verbs.update,
                processData: true,
                contentType: 'application/json',
                async: false,
                timeout: 10000,
                dataType: 'json'
            }).done(function (data) {
                returnValue = data.Success;
            });

            return returnValue;
        };
        this.getSettingValue = function (userPreferenceSetting, isarray) {
            var returnValue = null;
            jQuery.ajax({
                url: this.preferenceApiUrl + '?userpreferenceid=' + encodeURIComponent(userPreferenceSetting),
                data: null,
                type: this.verbs.read,
                processData: true,
                contentType: 'application/json',
                async: false,
                timeout: 10000,
                dataType: 'json'
            }).done(function (data) {
                if (isarray) {
                    if (data && data.Value) {
                        returnValue = JSON.parse(data.Value);
                    } else {
                        returnValue = [];
                    }
                } else {
                    if (data && data.Value && data.Value != []) {
                        returnValue = JSON.parse(data.Value)[0];
                    } else {
                        returnValue = undefined;
                    }
                }
            });
            return returnValue;
        };
    }
    return SearchServerModel;
})();

$(document).ajaxError(function (event, xhr, ajaxSettings, thrownError) {
    alert('WebAPI Error :: status : ' + xhr.status + ' --- status text : ' + xhr.statusText);
});
//# sourceMappingURL=UserPreferenceServer.js.map
