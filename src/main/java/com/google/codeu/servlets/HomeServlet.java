package com.google.codeu.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/**
 * This servlet prints out the HTML for the homepage. You wouldn't do this in a real codebase,
 * but this is meant to demonstrate getting a Blobstore URL and using it in a form to allow
 * a user to upload a file.
 */
@WebServlet("/home")
public class HomeServlet extends HttpServlet {

  /**
   * Returns HTML that contains a form. The form submits to Blobstore,
   * which redirects to our /my-form-handler, which is handled by FormHandlerServlet.
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
  throws IOException, ServletException {

    // Get the Blobstore URL
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    String uploadUrl = blobstoreService.createUploadUrl("/form-handler") ;

    response.setContentType("text/html");

    // This demonstrates creating a form that uses the Blobstore URL.
    // This is not how you'd do this in a real codebase!
    // See the hello-world-jsp or hello-world-fetch examples for more info.
    ServletOutputStream out = response.getOutputStream();
    out.println("<form method=\"POST\" enctype=\"multipart/form-data\" action=\"" + uploadUrl + "\">");

    out.println("<p>Type some text:</p>");
    out.println("<textarea name=\"message\"></textarea>");
    out.println("<br/>");

    out.println("<p>Upload an image:</p>");
    out.println("<input type=\"file\" name=\"image\">");
    out.println("<br/><br/>");

    out.println("<button>Submit</button>");
    out.println("</form>");

    // UserService userService = UserServiceFactory.getUserService();

    // boolean isUserLoggedIn = userService.isUserLoggedIn();
    // request.setAttribute("isUserLoggedIn", isUserLoggedIn);

    // if (userService.isUserLoggedIn()) {
    //   String username = userService.getCurrentUser().getEmail();
    //   request.setAttribute("username", username);
    // }

    // request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request,response);

  }
}