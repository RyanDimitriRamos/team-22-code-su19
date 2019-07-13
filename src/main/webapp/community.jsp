<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Community Page">

  <jsp:attribute name="head_area">
    <link rel="stylesheet" href="/css/community-page.css">
    <script src="/js/community-page-loader.js"></script>
  </jsp:attribute>

  <jsp:attribute name="body_area">
    <div id="page-title">
      <h1>Community Page</h1>
      <p>Here is a list of every user who has posted a message:</p>
      <hr/>
      <ul id="list">Loading...</ul>
    </div>
  </jsp:attribute>

</t:page>
