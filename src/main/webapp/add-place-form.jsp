<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Add a Table">

  <jsp:attribute name="head_area">
    <link rel="stylesheet" href="/css/forms.css">
    <script src="/js/add-place-form.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4I3tvQ3TusfDsDZBK0WBlc1sGzzeIqpw&libraries=places&callback=initAutocomplete"
        async defer></script>
  </jsp:attribute>

  <jsp:attribute name="body_area">
    <h3>Start a New Table</h3>
    <form action="/tables" method="POST" onsubmit="setFormSubmitting()">
      <label for="fname">First Name</label>
      <input type="text" id="fname" name="firstname" placeholder="Your name..">

      <label for="lname">Last Name</label>
      <input type="text" id="lname" name="lastname" placeholder="Your last name..">

      <label for="email">Email (Use the best email for others to reach you.)</label>
      <input type="email" id="email" name="email" placeholder="john@example.com">

      <label for="phonenum">Phone number</label>
      <input type="text" id="phonenum" name="phonenum" placeholder="000-000-0000">

      <label for="restaurant">Restaurant Search</label>
      <input id="autocomplete" placeholder="Enter restaurant name" type="text">

      <label for="restName">Restaurant Name</label>
      <input type="text" id="restName" name="restName" placeholder="Super Yummy Restaurant">

      <label for="restAdd">Restaurant Address</label>
      <input type="text" id="restAdd" name="restAdd" placeholder="1234 Fakestreet, CA 90210">

      <label for="restDes">Brief Restaurant Description (Help others decide if they would like to join.)</label>
      <input type="text" id="restDes" name="restDes" placeholder="This a fantastic restaurant that serves authentic Pho">

      <label for="datetime">Reservation Date</label>
      <input type="datetime-local" name="datetime">

      <label for="maxsize">Max party size (How many people would you like to join you?)</label>
      <input type="text" id="maxsize" name="maxsize" placeholder="8">

      <label for="subject">Other Notes</label>
      <textarea id="subject" name="subject" placeholder="I am looking for tablemates who are..."style="height:200px" ></textarea>

      <label for="lat"></label>
      <input type="hidden" id="lat" name="lat">

      <label for="lng"></label>
      <input type="hidden" id="lng" name="lng">

      <input type="submit" value="Submit"> 
    </form>
  </jsp:attribute>
  
</t:page>
