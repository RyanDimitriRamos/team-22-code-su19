/* Creating the map and setting up a basic cordinate and viewing zoom to start off with*/
let map;
let markers= [];

/**DEPRECATED editable marker that shows up where the user clicks on a map
let editMarker;
*/

function createMap(){
    console.log("Creating Map!");
    const sunnyVale = {lat: 37.403478, lng: -122.032490}; //Default location of map set to Google Sunnyvale office
    map = new google.maps.Map(document.getElementById('map'), {
      center: sunnyVale,
      zoom: 15,
      mapTypeControl: false
    });
    // Call to getUserLocation function
    getUserLocation();
    // 
    createAutocompleteBox();
    //Get user made markers and display them on the map
    fetchMarkers();

    // Fetching the styles.json file that hides all of the Points of interest.
    const url = '/styles.json';
    var styles;
    fetch(url)   
    .then((response) => {
      return response.json(); 
    })   
    .then((styles_json) => {
        //use dot notation to access values within the JSON object
        styles = styles_json;
        map.setOptions({styles: styles['hide']});
    })
    
    // Getting JSON file of restaurant data
    fetch('/restaurant-data')
    .then(function(response) {
      return response.json();
    }).then((restaurants) => {
      restaurants.forEach((restaurant) => {
        addLandmarkCSV(map, restaurant.lat, restaurant.lng, restaurant.name);
      });
    });
  }

// Get Geolocation
function getUserLocation(){
  var infoWindow = new google.maps.InfoWindow(); //Info window created to tell the user that their location has been found
    // Try setting map center to user's geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent("Now viewing tables near your location");
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    }
    else{
      handleLocationError(false, infoWindow, map.getCenter());
    }

}
// Adds a marker that shows an info window when clicked.
function addLandmarkCSV(map, lat, lng, description){
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  });
  const infoWindow = new google.maps.InfoWindow({
    content: description
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

// Handle an error if the user does not allow us access to their location.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  if(browserHasGeolocation){
    infoWindow.setContent("Error: Please allow us acess to your location so that may show tables near you. Once you do please refresh the page.")
  }
  infoWindow.open(map);
}
   
// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

function createAutocompleteBox(){
  // Creating the search box and placing it in the top right corner of the page
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var types = document.getElementById('type-selector');
  var strictBounds = document.getElementById('strict-bounds-selector');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    if(confirm("You are about to create a marker table that other users can see on this map. Are you sure that you want to do this?")){
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
      postMarker(place.geometry.location.lat(),place.geometry.location.lng(), place.name, address);
    }
    else{
      window.alert("Table creation stopped.")
    }

  });

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  document.getElementById('use-strict-bounds')
  .addEventListener('click', function() {
    console.log('Checkbox clicked! New state=' + this.checked);
    autocomplete.setOptions({strictBounds: this.checked});
  });
}
// Creates a marker that shows a read-only info window when clicked.
function createMarkerFromDataStore(lat, lng, name, address) {
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: lat, lng: lng}, 
    title: name
  });
  var contentString =
  '<div id="content">' + '<b>' +name + '</b>' + '<br/>' + 
   address + '</div>'+
  '</div>';
  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}


// Fetches markers from the backend and adds them to the map. 
function fetchMarkers(){
  fetch('/markers').then((response) => {
    return response.json();
  }).then((markers) => {
    markers.forEach((marker) => {
     createMarkerFromDataStore(marker.lat, marker.lng, marker.name, marker.address);
    });
  });
}


// Sends a marker to the backend for saving.
function postMarker(lat, lng, name, address){
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('name', name);
  params.append('address', address);
  fetch('/markers', {
    method: 'POST',
    body: params
  });

  window.location = 'add-place-form.html';
}

  
//Creates a marker that shows a read-only info window when clicked.
  function createMarkerForDisplay(lat, lng, content){
    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: content
    });
    marker.addListener('rightclick', () => {
      if(confirm("You are about to delete this marker. Are you sure that you want to?")){
        removeMarker(lat, lng, content);
        marker.setMap(null);
      }
    });
  }

function removeMarker(lat, lng, content){
  const baseURL = window.location.protocol + '//' + window.location.host;  
  const url = new URL(baseURL+'/markers');
  url.searchParams.append('lat',lat);
  url.searchParams.append('lng',lng);
  url.searchParams.append('content', content)
  
  // Removes marker from datastore
  fetch(url, {
    method:'DELETE'
  })
  .catch(error => console.log(error));
}


/** DEPRECATED May be reinstated at later time.
 * Creates a marker that shows a textbox the user can edit. 
function createMarkerForEdit(lat, lng){
  // If we're already showing an editable marker, then remove it.
  if(editMarker){
   editMarker.setMap(null);
  }
  editMarker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  });
  const infoWindow = new google.maps.InfoWindow({
    content: buildInfoWindowInput(lat, lng)
  });
  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });
  infoWindow.open(map, editMarker);
}
*/
/** DEPRECATED
 * Builds and returns HTML elements that show an editable textbox and a submit button. 
function buildInfoWindowInput(lat, lng){
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));
  button.onclick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    editMarker.setMap(null);
  };
  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);
  return containerDiv;
  
}
*/
/** DEPRECATED: To reinstate this deprecated code add this portion to the end of the createMap function.
// When the user clicks in the map, show a marker with a text box the user can edit.
// map.addListener('click', (event) => {
  //   createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
    // });
*/
