<!DOCTYPE html>
<html>
<head>
  <title>Tables Near You</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="css/maps.css">
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4I3tvQ3TusfDsDZBK0WBlc1sGzzeIqpw&libraries=places"
        async defer></script>
  <script src="/js/maps-page-loader.js"></script>
</head>
<body onload="createMap();">
    <nav>
        <ul id="navigation">
          <li><a href="/">Home</a></li>
          <li><a href="/feed.jsp">Open Tables</a></li>
          <li><a href="/community.jsp">User Community</a></li>
          <li><a href="/stats.jsp">Site Statistics</a></li>
          <li><a href="/maps.jsp">Tables Near Me</a></li>
          <li><a href="/chart.jsp">Charts</a></li>
          <li><a href="/image.jsp">Image Labeling</a></li>
          <li><a href="/aboutus.jsp">About Our Team</a></li>
        </ul>
      </nav>
  <h1> Open Tables Near You </h1>
  <div id="style-selector-control" class="map-control">
      <input type="radio" name="show-hide" id="show-poi"
      class="selector-control">
  <label for="show-poi">Show</label>
      <input type="radio" name="show-hide" id="hide-poi"
          class="selector-control" checked="checked"> 
      <label for="hide-poi">Hide</label>

  </div>
  <div class="pac-card" id="pac-card">
    <div>
      <div id="title">
        Add a restaurant: 
      </div>
      <div id="type-selector" class="pac-controls">
        <input type="radio" name="type" id="changetype-all" checked="checked">
        <label for="changetype-all">All</label>

        <input type="radio" name="type" id="changetype-establishment">
        <label for="changetype-establishment">Establishments</label>

        <input type="radio" name="type" id="changetype-address">
        <label for="changetype-address">Addresses</label>

        <input type="radio" name="type" id="changetype-geocode">
        <label for="changetype-geocode">Geocodes</label>
      </div>
      <div id="strict-bounds-selector" class="pac-controls">
        <input type="checkbox" id="use-strict-bounds" value="">
        <label for="use-strict-bounds">Strict Bounds</label>
      </div>
    </div>
    <div id="pac-container">
      <input id="pac-input" type="text"
          placeholder="Enter a location">
    </div>
  </div>
  <div id="map"></div>
  <div id="infowindow-content">
    <img src="" width="16" height="16" id="place-icon">
    <span id="place-name"  class="title"></span><br>
    <span id="place-address"></span>
  </div>

  <p>Here are all of the open tables that are near you. Users can create a marker at a restaurant that they want to dine at. They can also look at other user placed markers to see what tables they may like to join.
    <ul>
      <li>
        To create a marker the user just has to find the location they want to use in the "Add a restaurant" search bar.
      </li>
      <li>
        If the user would like to see points of interest near them, the user has the option to toggle points of interest on the Google map by clicking show on
        the box in the top left corner of the map. 
      </li>
      <li>
        To delete a marker right click on the marker and a prompt will appear, asking you if you are sure that you want to delete it. If you are sure selct yes.
      </li>
    </ul>
  </p>
</body>
</html>