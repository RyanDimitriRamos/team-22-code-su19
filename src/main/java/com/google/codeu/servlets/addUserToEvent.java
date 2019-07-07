package com.google.codeu.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class addUserToEvent
 */
@WebServlet("/addUserToEvent")
public class addUserToEvent extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String otherEmail = (String) request.getParameter("otherEmail");
		String time = (String) request.getParameter("timestamp");
		System.out.println(otherEmail + time);
	}

}
