<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();%>
<c:set var="uploadUrl"><% blobstoreService.createUploadUrl("/image-analysis"); %></c:set>

<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Image Upload Analysis">

  <jsp:attribute name="body_area">
    <h1>What's on your plate?</h1>
    <p>Label an picture of your meal using the Cloud Vision API.</p>

    <form method="POST" enctype="multipart/form-data" action="${uploadUrl}">
      <p>Upload an image:</p>
      <input type="file" name="image">
      <br/><br/>
      <button>Submit</button>
    </form>
  </jsp:attribute>

</t:page>
