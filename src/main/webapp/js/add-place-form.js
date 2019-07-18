var place, autocomplete;

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

// Autocomplete location information
function initAutocomplete() {
	console.log("INITIALIZED");
  geolocate();
	autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'));
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);
  autocomplete.addListener('place_changed', fillInAddress);
}


function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
      console.log("Set bounds");
    });
  }
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  console.log("Filling in address");
  place = autocomplete.getPlace();
  if (!place.geometry) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    window.alert("No details available for input: '" + place.name + "'");
    return;
  }

  var address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
    console.log("Address: ");
    console.log(address);
    document.getElementById('restAdd').value = address;
  }
  if (place.name){
    document.getElementById('restName').value = place.name;
  }
  if(place.geometry.location.lat()){
    console.log("Lat: ");
    console.log(place.geometry.location.lat());
    document.getElementById("lat").value = place.geometry.location.lat();
  }
  if(place.geometry.location.lng()){
    console.log("Lng: ");
    console.log(place.geometry.location.lng());
    document.getElementById("lng").value = place.geometry.location.lng();
  }
}
