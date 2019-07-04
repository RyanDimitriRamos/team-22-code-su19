<% boolean isUserLoggedIn = (boolean) request.getAttribute("isUserLoggedIn"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Gr•Eat</title>
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/feed.html">Open Tables</a></li>
        <li><a href="/community.html">User Community</a></li>
        <li><a href="/stats.html">Site Statistics</a></li>
        <li><a href="/maps.html">Tables Near Me</a></li>
        <li><a href="/chart.html">Charts</a></li>
        <li><a href="/image.jsp">Image Labeling</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
      
    <%
      if (isUserLoggedIn) {
        String username = (String) request.getAttribute("username");
    %>
        <a href="/user-page.html?user=<%= username %>">Your Page</a>
        <a href="/logout">Logout</a>
    <% } else {   %>
       <a href="/login">Login</a>
    <% } %>

      </ul>
    </nav>
    <h1>Gr•Eat</h1>
    <h2>We bring a more social experience to the dining table.</h2>
    <br>
    <h2>Get Started</h2>
    <br>
    <button class="btn makeListing">Start a New Table</button>
    <br>
    <button class="btn joinListing">Join an Existing Table</button>
    <br>
    <br>
    <h3>Projects we worked on</h3>
    <div class="info-card">
    <ul>
      <li>Dimitri: </li>
      <li>Jeremy: Added statistics and formatted text functionality to app. </li>
      <li>Maegan: </li>
      <li>Sunny: </li>
    </ul>
    </div>
  </body>
</html> 
