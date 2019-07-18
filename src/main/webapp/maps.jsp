<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:page title="Open Tables Near You">
  <jsp:attribute name="head_area">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="css/maps.css"> 
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4I3tvQ3TusfDsDZBK0WBlc1sGzzeIqpw&libraries=places" async defer></script>
  <script src="/js/maps-page-loader.js"></script>
  <script src="/js/markerclusterer.js"></script>
  </jsp:attribute>

  <jsp:attribute name="body_area">
    <body onload="createMap();">
    <h1> Open Tables Near You </h1>
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
      </ul>
  </body>
  </jsp:attribute>
</t:page>

