/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="typings/toastr/toastr.d.ts" />
// Module
var UserPreferenceSettings;
(function (UserPreferenceSettings) {
    // Class
    var Preferences = (function () {
        // Constructor
        function Preferences() {
            this.configureDropdownListForSettingValue = function (selector, userpreferenceid, observableVar) {
                $(document).on('change', selector, function () {
                    var values = [];
                    if (parseInt(observableVar(), 10) > 0) {
                        values.push(parseInt(observableVar(), 10));
                        searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                    } else {
                        //write the defaulted "values" array since the drop-down list is undefined. It is initialized to : "values = [0]" . This happens if the user chooses the choice in the drop-down labeled "Choose..."
                        searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                    }
                });
            };
            this.configureMultiForSettingValue = function (selector, userpreferenceid, arr) {
                $(selector).click(function () {
                    var values = [];
                    for (var i = 0; i < arr().length; i++) {
                        if (parseInt(arr()[i], 10) > 0) {
                            values.push(parseInt(arr()[i], 10));
                        }
                    }
                    searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                });
            };
            this.configureRadiobuttonListForSettingValue = function (selector, userpreferenceid, observableVar) {
                $(selector).click(function () {
                    //since the observableVar passed in holds the currently selected value in the radio button (which is inherently a single select control) we can use it to set the preference and avoid looping through all the radio buttons to find the one that is selected
                    var values = [];
                    if (parseInt(observableVar(), 10) > 0) {
                        values.push(parseInt(observableVar(), 10)); //This writes the Type's ID (i.e. for "Both" it would pass a 1, for "New" it would pass a 2, etc....)
                        searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                    } else {
                        searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                    }
                });
            };
            this.configureCheckboxForSettingValue = function (selector, userpreferenceid, arr) {
                $(selector).click(function () {
                    var values = [];
                    for (var i = 0; i < arr().length; i++) {
                        if (parseInt(arr()[i], 10) > 0) {
                            values.push(parseInt(arr()[i], 10));
                        }
                    }
                    searchServer.setSettingValue(userpreferenceid, JSON.stringify(values));
                });
            };
            searchServer = window['sserver'];
        }
        return Preferences;
    })();
    UserPreferenceSettings.Preferences = Preferences;
})(UserPreferenceSettings || (UserPreferenceSettings = {}));
//# sourceMappingURL=UserPreferenceSettings.js.map
