var jQuery = $.noConflict();
// Run your custom code when the DOM is ready.
jQuery(document).ready(function () {

    var scriptBase = _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/";

    var libSpRuntime = scriptBase + "SP.runtime.js",
        libSp = scriptBase + "SP.js",
        libSpCore = scriptBase + "SP.Core.js",
        libAutoFill = scriptBase + "autofill.js",
        libClientPPicker = scriptBase + "clientpeoplepicker.js",
        libClientForms = scriptBase + "clientforms.js",
        libClientTemplate = scriptBase + "clienttemplates.js"; 
    
    //  Doesn't work sometime
    jQuery.when(jQuery.getScript(libSpCore),
           jQuery.getScript(libSp),
           jQuery.getScript(libSpRuntime),
           jQuery.getScript(libClientTemplate),
           jQuery.getScript(libClientForms),
           jQuery.getScript(libClientPPicker),
           jQuery.getScript(libAutoFill),
           jQuery.Deferred(function (deferred) {
               jQuery(deferred.resolve);
           }))
         .done(run);
        

    function run() {
        
        var vm = {
            user: ko.observable("akhilesh.nirapure@zevenseas.com")
        };

        ko.applyBindings(vm);
    };


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

            //  TODO: This is currently not in place will be added later
            var options = allBindingsAccessor().ppp || schema;
            //  Initialize the Control, MS enforces to pass the Element ID hence we need to provide 
            //  ID to our element, no other options
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(element.id, null, options);

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

