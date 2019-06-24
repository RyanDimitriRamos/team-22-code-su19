<% boolean isUserLoggedIn = (boolean) request.getAttribute("isUserLoggedIn"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CodeU Starter Project</title>
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
        <li><a href="/user-page.html">Send a Message</a></li>
        <li><a href="/feed.html">My Messages</a></li>
        <li><a href="/community.html">User Community</a></li>
        <li><a href="/stats.html">Site Statistics</a></li>
        <li><a href="/maps.html">Maps</a></li>
        <li><a href="/chart.html">Charts</a></li>
        <li><a href="/image.jsp">Image Labeling</a></li>
      
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
    <h1>YOU ARE LOGGED IN</h1>
  </body>
</html> 