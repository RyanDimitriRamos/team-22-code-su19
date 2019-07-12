
// Bool to set whether user has edited form
var hasEditedForm = function() { 
    return false; 
}

// Set bool if user is submitting form
var formSubmitting = false;
var setFormSubmitting = function() { 
    formSubmitting = true; 
};


window.addEventListener("beforeunload", function (e) {
  if (formSubmitting || !hasEditedForm()) {
      return undefined;
  }

  var confirmationMessage = 'It looks like you have unsaved changes. '
                          + 'If you leave before submitting, your changes will be lost.';

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
