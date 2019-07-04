<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
  <title>Stats</title>
  <link rel="stylesheet" href="/css/main.css">
  <script src="/js/stats-loader.js"></script>
</head>

<body onload="buildUI()">
	<nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/feed.html">Open Tables</a></li>
        <li><a href="/community.html">User Community</a></li>
        <li><a href="/stats.jsp">Site Statistics</a></li>
        <li><a href="/maps.html">Tables Near Me</a></li>
        <li><a href="/chart.html">Charts</a></li>
        <li><a href="/image.jsp">Image Labeling</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
      </ul>
    </nav>

<div id="content">
  <h1>Site Statistics</h1>
  <hr/>
  <p> Information on who's using GrEat: </p>
  <div id="stats-container">Loading...</div>
  <div id="users-container">Loading...</div>
  <p>The current time is: <%= new Date().toString() %></p>
</div>
</body>
</html>
