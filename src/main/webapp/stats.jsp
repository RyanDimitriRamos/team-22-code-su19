<%@ page import="java.util.Date" %>
<c:set var="date"><% new Date().toString(); %></c:set>

<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Stats">

  <jsp:attribute name="head_area">
    <script src="/js/stats-loader.js"></script>
  </jsp:attribute>

  <jsp:attribute name="body_area">
    <div id="content">
      <h1>Site Statistics</h1>
      <hr/>
      <p>Information on who's using Gr&bull;Eat: </p>
      <div id="stats-container">Loading...</div>
      <div id="users-container">Loading...</div>
    </div>
  </jsp:attribute>

</t:page>
