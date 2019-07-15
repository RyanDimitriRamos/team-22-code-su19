<!DOCTYPE html>
<%@tag description="Page Layout" pageEncoding="UTF-8"%>
<%@attribute name="title"%>
<%@attribute name="head_area" fragment="true" %>
<%@attribute name="body_area" fragment="true" %>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/css/main.css">
    <jsp:invoke fragment="head_area"/>
    <script src="/js/navigation-loader.js"></script>
  </head>
  <body>
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/feed.jsp">Open Tables</a></li>
        <li><a href="/community.jsp">User Community</a></li>
        <li><a href="/stats.jsp">Site Statistics</a></li>
        <li><a href="/maps.jsp">Tables Near Me</a></li>
        <li><a href="/chart.jsp">Charts</a></li>
        <li><a href="/image.jsp">Easter Egg</a></li>
        <li><a href="/aboutus.jsp">About Our Team</a></li>
      </ul>
    </nav>
    <jsp:invoke fragment="body_area"/>
  </body>
</html>
