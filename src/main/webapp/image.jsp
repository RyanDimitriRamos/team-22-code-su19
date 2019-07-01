<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/image-analysis"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Image Upload Analysis</title>
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
        <li><a href="/feed.html">My Messages</a></li>
        <li><a href="/community.html">User Community</a></li>
        <li><a href="/stats.jsp">Site Statistics</a></li>
        <li><a href="/maps.html">Maps</a></li>
        <li><a href="/chart.html">Charts</a></li>
        <li><a href="/image.jsp">Image Labeling</a></li>
      </ul>
    </nav>
    <h1>Image Upload Analysis</h1>
    <p>Label an image using the Cloud Vision API.</p>

    <form method="POST" enctype="multipart/form-data" action="<%= uploadUrl %>">
      <p>Upload an image:</p>
      <input type="file" name="image">
      <br/><br/>
      <button>Submit</button>
    </form>
  </body>
</html>
