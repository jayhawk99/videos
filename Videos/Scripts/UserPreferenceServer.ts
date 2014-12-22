
class SearchServerModel {
    verbs = {
        'read': 'GET',
        'update': 'PUT',
        'delete': 'DELETE',
        'create': 'POST'
    }
    constructor(public categoryApiUrl: string, public colorApiUrl: string, public sizesApiUrl: string, public typeApiUrl: string, public preferenceApiUrl: string) {

    }
    getColors = function () {
        return jQuery.ajax({
            url: this.colorApiUrl,
            type: this.verbs.read
        });
    }
    getCategories = function () {
        return jQuery.ajax({
            url: this.categoryApiUrl,
            type: this.verbs.read
        });

    }

    getCategory = function (id) {
        return jQuery.ajax({
            url: this.categoryApiUrl + '/' + id,
            type: this.verbs.read
        });

    }

    getTypes = function () {
        return jQuery.ajax({
            url: this.typeApiUrl,
            type: this.verbs.read
        });

    }

    getType = function (id) {
        return jQuery.ajax({
            url: this.typeApiUrl + '/' + id,
            type: this.verbs.read
        });

    }

    getColor = function (id) {
        return jQuery.ajax({
            url: this.colorApiUrl + '/' + id,
            type: this.verbs.read
        });

    }

    getSize = function (id) {
        return jQuery.ajax({
            url: this.sizesApiUrl + '/' + id,
            type: this.verbs.read
        });

    }

    getSizes = function () {
        return $.ajax({
            url: this.sizesApiUrl,
            type: this.verbs.read
        });

    }
    setSettingValue = function (userPreferenceSetting, value) {
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
        }).done(function (data) { returnValue = data.Success; });

        return returnValue;

    }

    getSettingValue = function (userPreferenceSetting, isarray) {
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
                    if (data && data.Value) { /* we allow nulls in the Value column so we have to check for that and skip if that's what's stored*/
                        returnValue = JSON.parse(data.Value);
                    }
                    else {
                        returnValue = [];
                    }
                } else {
				if (data && data.Value && data.Value != []) { /* we allow nulls in the Value column so we have to check for that and skip if that's what's stored*/
                        returnValue = JSON.parse(data.Value)[0];
                    }
                    else {
                        returnValue = undefined;
                    }
                }
            });
        return returnValue;
    }
}

$(document).ajaxError(function (event, xhr, ajaxSettings, thrownError) {
    alert('WebAPI Error :: status : ' + xhr.status + ' --- status text : ' + xhr.statusText);
});