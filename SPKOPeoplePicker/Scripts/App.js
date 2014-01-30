var jQuery = $.noConflict();
// Run your custom code when the DOM is ready.
jQuery(document).ready(function () {

    var vm = {
        user: ko.observable("akhilesh.nirapure@zevenseas.com")
    };

    ko.applyBindings(vm);
   
});


(function (jQuery) {
    ko.bindingHandlers.kopeoplepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {

            var schema = {};
            schema['PrincipalAccountType'] = 'User';
            schema['SearchPrincipalSource'] = 15;
            schema['ShowUserPresence'] = true;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowEmailAddresses'] = true;
            schema['AllowMultipleValues'] = false;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = '280px';
            schema["OnUserResolvedClientScript"] = function (elemId, userKeys) {
                //  get reference of People Picker Control
                var pickerElement = SPClientPeoplePicker.SPClientPeoplePickerDict[elemId];
                var observable = valueAccessor();
                observable(pickerElement.GetControlValueAsJSObject()[0]);
                console.log(JSON.stringify(pickerElement.GetControlValueAsJSObject()[0]));
            };

            //  TODO: You can provide schema settings as options
            var mergedOptions = allBindingsAccessor().options || schema;

            //  Initialize the Control, MS enforces to pass the Element ID hence we need to provide 
            //  ID to our element, no other options
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(element.id, null, mergedOptions);

            //  Force to Ensure User
            var userValue = ko.utils.unwrapObservable(valueAccessor());
            var pickerControl = SPClientPeoplePicker.SPClientPeoplePickerDict[element.id + "_TopSpan"];
            var editId = "#" + pickerControl.EditorElementId;
            jQuery(editId).val(userValue);

            // Resolve the User
            pickerControl.AddUnresolvedUserFromEditor(true);
            
        }
    };

})(jQuery);

