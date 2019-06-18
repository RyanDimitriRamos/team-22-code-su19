package com.google.codeu.servlets;


import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import java.util.Scanner;

// takes data from csv and translate it to json
@WebServlet("/ChartServlet")
public class ChartServlet extends HttpServlet {


  private JsonArray restaurantGuestArray;

  // Restaurant Attendance Class
  private static class restaurantGuestNumbers {
    String name;
    int numGuests;

    private restaurantGuestNumbers (String name, int numGuests) {
      this.name = name;
      this.numGuests = numGuests;
    }
  }


  @Override
  public void init() {
    //import data from csv
	restaurantGuestArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/popular-restaurants.csv"));
    scanner.nextLine(); //skips first line (the csv header)
    //iterate through each row of csv files and add to json
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      String curName = cells[1];
      int curNumGuests = Integer.parseInt(cells[5]);

      restaurantGuestArray.add(gson.toJsonTree(new restaurantGuestNumbers(curName, curNumGuests)));
    }
    scanner.close();
  }

   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
     response.setContentType("application/json");
     response.getOutputStream().println(restaurantGuestArray.toString());
   }


}
