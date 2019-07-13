<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Gr&bull;Eat">

  <jsp:attribute name="body_area">
    <h1>Gr&bull;Eat</h1>

    <div class="tagline">
      <h2>We bring a more social experience to the dining table.</h2>
      <br>
      <h2>Get Started</h2>
    </div>
    <button class="btn btn-home makeListing" onclick="window.location.href='/add-place-form.jsp';">Start a New Table</button>
    <button class="btn btn-home joinListing" onclick="window.location.href='feed.jsp';">Join an Existing Table</button>
    <br>
    <br>

    <h3>Projects we worked on</h3>
    <div class="info-card">
      <ul>
        <li>Dimitri: Added maps functionality</li>
        <li>Jeremy: Added statistics and formatted text functionality to app. </li>
        <li>Maegan: Redirected functionality and formatted message feed</li>
        <li>Sunny: Modified homepage to reflect the product, added search to maps, made form for adding a table</li>
      </ul>
    </div>
  </jsp:attribute>

</t:page>
