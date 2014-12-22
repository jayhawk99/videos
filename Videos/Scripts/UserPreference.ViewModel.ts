interface IDescription { Id: KnockoutObservable<string>; Description: KnockoutObservable<string>; }
interface IName { Id: KnockoutObservable<string>; Name: KnockoutObservable<string>; }
module UserPreference {
    declare var $;
    declare var toastr;
    declare var ko;
    declare var searchServer: SearchServerModel;

    export class viewmodel {

        //Creates a new instance of the UserPreferenceSettings.Preferences() class in UserPreferenceSettings.js that holds the methods for wiring up events to ui controls that automatically send data to the backend for persistence of user preferences.
        searchPref = new UserPreferenceSettings.Preferences();

        searchServer = window['sserver'];

        //When we use toastr to show the current preferences this  observable holds the message that is displayed if there is no persisted preference (i.e. the "Choose..." on a drop-down is selected or no radio button is clicked, etc...)
        NoPreferenceMessage = ko.observable('No preference defined.');

        //This holds all the colors in the Colors table. It is used to build drop-downs which show all possible colors available.
        colorArray = ko.observableArray([]);

        //This holds all the sizes in the Sizes table. It is used to build drop-downs which show all possible sizes available.
        sizeArray = ko.observableArray([]);

        //This holds all the categories in the Categories table. It is used to build drop-downs which show all possible categories available.
        categoryArray = ko.observableArray([]);

        //This holds all the types in the Types table. It is used to build drop-downs which show all possible types available.
        typeArray = ko.observableArray([]);

        //This holds all the currently selected values in the multi-select list. knockout bindings automatically add and remove from this array as the ui is manipulated. Likewise, if code were to add or remove an item from this array it would click or unclick that choice in the mulit-select list.
        typeMultiArraySelected = ko.observableArray([]);

        //This holds all the currently selected values in the checkboxes. knockout bindings automatically add and remove from this array as the ui is manipulated. Likewise, if code were to add or remove an item from this array it would click or unclick that choice in the checkboxes.
        checkedArray = ko.observableArray([]);

        //This holds the currently selected value in the color drop-down list. knockout bindings automatically update this value as an item is selected. If code were to set this value the corresponding choice in the dropdown would be selected.
        ColorId = ko.observable('');

        //This holds the description of all the currently selected values in the checkboxes. The array that holds all the possible values is "grep"ed (jQuery) to find all the checked choices, then their descriptions are concatenated together and stored in this observable.
        CheckedSelectedDescription = ko.observable('');

        //This holds the description of all the currently selected values in the multi-select control. The array that holds all the possible values is "grep"ed (jQuery) to find all the selected choices, then their descriptions are concatenated together and stored in this observable.
        MultiSelectedDescription = ko.observable('');

        //This holds the currently selected value in the size drop-down list. knockout bindings automatically update this value as an item is selected. If code were to set this value the corresponding choice in the dropdown would be selected.
        SizeId = ko.observable('');

        //This holds the currently selected value in the categories drop-down list. knockout bindings automatically update this value as an item is selected. If code were to set this value the corresponding choice in the dropdown would be selected.
        CategoryId = ko.observable('');

        //This holds the name of the currently selected value in the color drop-down list. (i.e. this is the Name/Descripotion of the ColorId() observable that tracks the currently selected value in the Color dropdown.)
        ColorName = ko.observable('');

        //This holds the name/description of the currently selected value in the size drop-down list. (i.e. this is the Name/Description of the SizeId() observable that tracks the currently selected value in the Size dropdown.)
        SizeName = ko.observable('');

        //This holds the name/description of the currently selected value in the categories drop-down list. (i.e. this is the Name/Description of the CategoryId() observable that tracks the currently selected value in the Categories dropdown.)
        CategoryDescription = ko.observable('');

        //This holds the name/description of the currently selected value in the type drop-down list. (i.e. this is the Name/Description of the TypeId() observable that tracks the currently selected value in the Type dropdown.)
        Type = ko.observable('');

        //This holds the currently selected value in the type drop-down list. knockout bindings automatically update this value as an item is selected. If code were to set this value the corresponding choice in the dropdown would be selected.
        TypeId = ko.observable('');



        //Called from the fillArray() method which receives a reference to this as an argument. If the array in the json has Name and Id as properties, this is the one to use for wrapping the data
        DdlWrapperName = function (item) {
            this.Name = ko.observable(item.Name);
            this.Id = ko.observable(item.Id);
            return this;
        }

        //Called from the fillArray() method which receives a reference to this as an argument. If the array in the json has Description and Id as properties, this is the one to use for wrapping the data
        DdlWrapperDescription = function (item) {
            this.Description = ko.observable(item.Description);
            this.Id = ko.observable(item.Id);
            return this;
        }

        //Each array has a  method that is used to fill it with data, but each of those in turn call this one method to actually add the values.
        //The args are: 
        //  data - The json with the array data.  
        //  arr - The array into which the json will be pushed    
        //  f - the wrapper function to ensure each property of the array is observable. 
        //Some use "name" and some use "description". By passing in the function that will "wrap" the array items a function designed to find that specific property name can be called.
        fillArray(data, arr, f) {
            //empty the array so we don't get duplicate data rows
            arr([]);

            if (data === null)
                return;

            //load up the data
            var underlyingArray = arr();
            ko.utils.arrayMap(data, function (item) {
                //add the data to the underlying array one row at a time
                underlyingArray.push(new f(item));
            });
            //Now notify the UI that the data has been changed so events to which the UI may be subscribed will fire once.
            arr.valueHasMutated();
        }


        //The initial function called to fill the typeArray. This passes the necessary args to fillArray() for actual processing
        fillTypeArray(data) {
            this.fillArray(data, this.typeArray, this.DdlWrapperDescription);
        }

        //The initial function called to fill the categoryArray. This passes the necessary args to fillArray() for actual processing
        fillCategoryArray(data) {
            this.fillArray(data, this.categoryArray, this.DdlWrapperDescription);
        }

        //The initial function called to fill the colorArray. This passes the necessary args to fillArray() for actual processing
        fillColorArray(data) {
            this.fillArray(data, this.colorArray, this.DdlWrapperName);
        }

        //The initial function called to fill the sizeArray. This passes the necessary args to fillArray() for actual processing
        fillSizeArray(data) {
            this.fillArray(data, this.sizeArray, this.DdlWrapperName);
        }

        //This is where the actual call to binding occurs. It is the next to last thing called in the self-executing function that runs after the page is loaded.
        show() {
            ko.applyBindings(this, $('#searchOutputDiv').get(0));
        }

        //This is where the binding of event handling occurs. It is the last thing called in the self-executing function that runs after the page is loaded.
        //All the data is loaded and all the initial selections are set before this happens.
        wireEvents() {
            this.searchPref.configureDropdownListForSettingValue('#col', 1, this.ColorId);
            this.searchPref.configureDropdownListForSettingValue('#cat', 2, this.CategoryId);
            this.searchPref.configureDropdownListForSettingValue('#siz', 3, this.SizeId);
            this.searchPref.configureRadiobuttonListForSettingValue('.rb', 4, this.TypeId);
            this.searchPref.configureCheckboxForSettingValue('.cb', 5, this.checkedArray);
            this.searchPref.configureMultiForSettingValue('#typA', 6, this.typeMultiArraySelected);
            $('#showPreferences').on('click',this, this.showPreferences);
        }
        //When the button to show the toast notification showing all current preferences is clicked this method runs. It uses the grepArrayForSelections() and getTextForMultipleSelections() to
        //resolve the textual names/descriptions of the items selected.
        showPreferences(t) {
            var d = t.data;

            if (d.categoryArray()[0].hasOwnProperty('Description')) {
                d.CategoryDescription(d.grepArrayForSelections(d.categoryArray(), d.CategoryId()));
            } else {
                d.CategoryDescription(d.grepArrayForSelections2(d.categoryArray(), d.CategoryId()));
            }

            if (d.sizeArray()[0].hasOwnProperty('Description')) {
                d.SizeName(d.grepArrayForSelections(d.sizeArray(), d.SizeId()));
            } else {
                d.SizeName(d.grepArrayForSelections2(d.sizeArray(), d.SizeId()));
            }

            if (d.colorArray()[0].hasOwnProperty('Description')) {
                d.ColorName(d.grepArrayForSelections(d.colorArray(), d.ColorId()));
            } else {
                d.ColorName(d.grepArrayForSelections2(d.colorArray(), d.ColorId()));
            }

            if (d.typeArray()[0].hasOwnProperty('Description')) {
                d.Type(d.grepArrayForSelections(d.typeArray(), d.TypeId()));
            } else {
                d.Type(d.grepArrayForSelections2(d.typeArray(), d.TypeId()));
            }
            var ret = d.getTextForMultipleSelections(d.typeArray(), d.typeMultiArraySelected(), ', ');
            d.MultiSelectedDescription(ret === '' ? d.NoPreferenceMessage() : ret);
            ret = d.getTextForMultipleSelections(d.typeArray(), d.checkedArray(), ', ');
            d.CheckedSelectedDescription(ret === '' ? d.NoPreferenceMessage() : ret);
            toastr.options = {
                "positionClass": "toast-bottom-left"
            };
            toastr.info(
                '<hr/>Category : ' + d.CategoryDescription() +
                '<hr/>Color : ' + d.ColorName() +
                '<hr/>Size : ' + d.SizeName() +
                '<hr/>Multi : ' + d.MultiSelectedDescription() +
                '<hr/>Type : ' + d.Type() +
                '<hr/>Checked : ' + d.CheckedSelectedDescription(),
                'Search Preferences');
        }

        //When determining what has been selected in a control that can have multiple selections (multi select list or checkboxes) this method is used to build a string that shows
        //the name or description of each selected item. Basically it loops through the allChoices array and adds any to the retValue varaible if it finds that item in the selectedChoices array. 
        //It takes the following args:
        //  allChoices - an array which holds all the possible values. The same array used to build the choices in the multi-select or the checkbox group
        //  selectedChoices - an array which holds all the currently selected choices for a multi select control. This will be the observable array you assigned the control through knockout bindings.
        //  separator - a string that you want to use to delimit the names/descriptions. Typically this will be a comma followed by a space (', ') so the result is "Blue, Red, Green" if the three choices have names/descriptions of "Blue", "Red", and "Green"
        //To see how this is called see the showPreferences() method. It checks for a property "Name" or "Description" so it can be used for arrays that have Id and Name or Id and Description
        getTextForMultipleSelections(allChoices, selectedChoices, separator) {
            var retValue = [];
            $.each(allChoices, function (index, value) {
                $.each(selectedChoices, function (i, v) {
                    if (v) {
                        if (value.Id().toString() === v.toString()) {
                            retValue.push(value.Description());
                        }
                    }
                });
            });
            return retValue.join(separator);
        }

        getTextForMultipleSelections2(allChoices, selectedChoices, separator) {
            var retValue = [];
            $.each(allChoices, function (index, value) {
                $.each(selectedChoices, function (i, v) {
                    if (v) {
                        if (value.Id().toString() === v.toString()) {
                            retValue.push(value.Name());
                        }
                    }
                });
            });
            return retValue.join(separator);
        }

        //When determining what has been selected in a control that can have only a single selection (drop-down list or radio button) this method is used to determine 
        //the name or description of the selected item. Basically it loops through the arr array that is passed in and adds what it finds to the ret varaible. 
        //It takes the following args:
        //  arr - an array which holds all the possible values. The same array used to build the choices in the drop-down list or radio button group
        //  targetValue - the value which holds the currently selected choice for a single value control. This will be the observable variable you assigned the control through knockout bindings.
        //To see how this is called see the showPreferences() method. It checks for a property "Name" or "Description" so it can be used for arrays that have Id and Name or Id and Description
        grepArrayForSelections(arr, targetValue) {
            
            var ret = $.grep(arr, function (n: IDescription, i) {
                return parseInt(n.Id(), 10) === parseInt(targetValue, 10);
            });
            if (ret.length) {
                return ret[0].Description();
            }
            else {
                return this.NoPreferenceMessage();
            }
        }
        grepArrayForSelections2(arr, targetValue) {

            var ret = $.grep(arr, function (n : IName, i) {
                return parseInt(n.Id(), 10) === parseInt(targetValue, 10);
            });
            if (ret.length) {
                return ret[0].Name();
            }
            else {
                return this.NoPreferenceMessage();
            }
        }
    }//end class viewmodel
    
}//end namespace UserPreference

$(() => {
    var userPreferenceViewModel = new UserPreference.viewmodel();
    
    $.when(userPreferenceViewModel.searchServer.getCategories(), userPreferenceViewModel.searchServer.getColors(), userPreferenceViewModel.searchServer.getSizes(), userPreferenceViewModel.searchServer.getTypes()).done(function (cat, col, siz, typ) {
        
        //these calls to fillXXXArray() simply load the data into the view model observable arrays. It is possible they could be null or undefined if there is no preference in the db
        //so we check to see that they are both defined and have at least one element in the array. If not, they are null and the method to ultimately fill the array (fillArray())
        //will not touch the array if the data sent in is null.
        userPreferenceViewModel.fillCategoryArray((cat && cat[0]) ? cat[0] : null);
        userPreferenceViewModel.fillColorArray((col && col[0]) ? col[0] : null);
        userPreferenceViewModel.fillSizeArray((siz && siz[0]) ? siz[0] : null);
        userPreferenceViewModel.fillTypeArray((typ && typ[0]) ? typ[0] : null);
        
        
        
        //these calls set the selected values. Each of these results in a discrete ajax call to get user preferences from the db. 
        //it is wrapped in a jQuery .when() construct to ensure that all the values which are used to pre-select control values have been populated before we try to bind the data to the page.
		$.when(
		    userPreferenceViewModel.searchServer.getSettingValue(1, false),
            userPreferenceViewModel.searchServer.getSettingValue(2, false),
            userPreferenceViewModel.searchServer.getSettingValue(3, false),
            userPreferenceViewModel.searchServer.getSettingValue(6, true),
			userPreferenceViewModel.searchServer.getSettingValue(4, false),
			userPreferenceViewModel.searchServer.getSettingValue(5, true)
			).done((color, category, size, multiArraySelected, type, checkedArray) => {
				userPreferenceViewModel.ColorId(color);
				userPreferenceViewModel.CategoryId(category);
				userPreferenceViewModel.SizeId(size);
				userPreferenceViewModel.typeMultiArraySelected(multiArraySelected);
				userPreferenceViewModel.TypeId(type);
				userPreferenceViewModel.checkedArray(checkedArray);

				//Call show() to initiate the binding of the knockout templates
				userPreferenceViewModel.show();
				//wire up the UI controls to their respective change/click events so they send values back to the server when the event occurs.....
				userPreferenceViewModel.wireEvents();
		});
    });
});