<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Open Tables">

  <jsp:attribute name="head_area">
    <link rel="stylesheet" href="/css/user-page.css">
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
    <script src="/js/feed-loader.js"></script>
  </jsp:attribute>

  <jsp:attribute name="body_area">
    <div id="content">
      <h1>Open Tables</h1>
      <p>See all the events that people are talking about! </p>
      <hr/>
      <div id="message-container">Loading...</div>
    </div>
  </jsp:attribute>

</t:page>
