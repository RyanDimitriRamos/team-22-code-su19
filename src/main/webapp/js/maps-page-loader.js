/* Creating the map and setting up a basic cordinate and viewing zoom to start off with*/
let map;

//Editable marker that shows up where the user clicks on a map
let editMarker;
function createMap(){
    const sunnyVale = {lat: 37.403478, lng: -122.032490};
    map = new google.maps.Map(document.getElementById('map'), {
      center: sunnyVale,
      zoom: 15,
      mapTypeControl: false
    });
    var infoWindow = new google.maps.InfoWindow();

    // When the user clicks in the map, show a marker with a text box the user can edit.
    map.addListener('click', (event) => {
      createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
    });

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
          addLandmark(map, restaurant.lat, restaurant.lng, restaurant.name);
      });
    });
    
    // Add controls to the map, allowing users to hide/show features.
    var styleControl = document.getElementById('style-selector-control');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

    // Apply the JSON when the user chooses to hide/show features.
    document.getElementById('hide-poi').addEventListener('click', function() {
      map.setOptions({styles: styles['hide']});
    });
    document.getElementById('show-poi').addEventListener('click', function() {
        map.setOptions({styles: styles['default']});
    });

    // Try HTML5 geolocation.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
    
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
      });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }

}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, title){
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: title
  });
}

/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers(){
  fetch('/markers').then((response) => {
    return response.json();
  }).then((markers) => {
    markers.forEach((marker) => {
     createMarkerForDisplay(marker.lat, marker.lng, marker.content)
    });
  });
}
/** Creates a marker that shows a read-only info window when clicked. */
function createMarkerForDisplay(lat, lng, content){
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: content
  });

}
/** Sends a marker to the backend for saving. */
function postMarker(lat, lng, content){
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);
  fetch('/markers', {
    method: 'POST',
    body: params
  });
}
/** Creates a marker that shows a textbox the user can edit. */
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
/** Builds and returns HTML elements that show an editable textbox and a submit button. */
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