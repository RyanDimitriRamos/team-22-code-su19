/* Creating the map and setting up a basic cordinate and viewing zoom to start off with*/
function createMap(){
    //Location of a shopping center close to my house
    const mandarinPlaza = {lat: 33.995119, lng: -117.8895367};
    const map = new google.maps.Map(document.getElementById('map'), {
      center: mandarinPlaza,
      zoom: 15,
      mapTypeControl: false
    });


    var infoWindow = new google.maps.InfoWindow();

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
    

    //Creating landmarks
    addLandmark(map, boilingCrab, 'Boiling Crab',
      'Chill and relaxed cajun seafood.');
    addLandmark(map, aftersIceCream, 'Afters Ice Cream',
      'Happy and trendy Ice Cream Bar.');
    addLandmark(map, newGoldenCity, 'New Golden City',
      'Comforting and authentic Chinese food.');
    addLandmark(map, slurpinRamen, 'Slurpin\'Ramen Noodle Bar',
      'Chill, moody ambient atmosphere with great build your own ramen bowls.');
    
    // Add controls to the map, allowing users to hide/show features.
    var styleControl = document.getElementById('style-selector-control');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

    // Apply new JSON when the user chooses to hide/show features.
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
function addLandmark(map, location,  title, description){
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title
  });
  const infoWindow = new google.maps.InfoWindow({
    content: description
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}