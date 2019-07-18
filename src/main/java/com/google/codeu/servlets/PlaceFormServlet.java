package com.google.codeu.servlets;

import java.io.IOException;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.PreparedQuery.TooManyResultsException;
import com.google.appengine.api.datastore.Query;
import com.google.cloud.datastore.StructuredQuery;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.EntityQuery;
import com.google.gson.Gson;
import com.sun.org.apache.xerces.internal.dom.EntityImpl;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.codeu.data.Table;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;


@WebServlet("/tables")
public class PlaceFormServlet extends HttpServlet {

  /** Responds with a JSON array containing marker data. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");

    List<Table> tables = getTables();
    Gson gson = new Gson();
    String json = gson.toJson(tables);

    response.getOutputStream().println(json);
  }

  /** Accepts a POST request containing a new table */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) 
    throws IOException{
    String firstName = Jsoup.clean(request.getParameter("firstname"), Whitelist.none());
    String lastName  = Jsoup.clean(request.getParameter("lastname"), Whitelist.none());
    String email = Jsoup.clean(request.getParameter("email"), Whitelist.none());
    String phoneNumber = Jsoup.clean(request.getParameter("phonenum"), Whitelist.none());
    String restName = Jsoup.clean(request.getParameter("restName"), Whitelist.none());
    String restAdd = Jsoup.clean(request.getParameter("restAdd"), Whitelist.none());
    String restDes = Jsoup.clean(request.getParameter("restDes"), Whitelist.none());
    String dateTime = Jsoup.clean(request.getParameter("datetime"), Whitelist.none());
    String maxSize = Jsoup.clean(request.getParameter("maxsize"), Whitelist.none());
    String otherNotes = Jsoup.clean(request.getParameter("subject"), Whitelist.none());
    String latString = Jsoup.clean(request.getParameter("lat"), Whitelist.none());
    String lngString = Jsoup.clean(request.getParameter("lng"), Whitelist.none());
    double lat;
    double lng;
    try {
      lat = Double.parseDouble(latString);
      lng = Double.parseDouble(lngString);
    }
    catch (NumberFormatException e) {
      lat = 0.0;
      lng = 0.0;
    }

    int max;
    try {
      max = Integer.parseInt(maxSize);
    }
    catch (NumberFormatException e) {
      max = 8;
    }
    List<String> members = new ArrayList<>(max);

    Table table = new Table(firstName, lastName, email, phoneNumber, restName, restAdd, restDes, dateTime, maxSize, otherNotes, members, lat, lng);
    storeTable(table);
    response.sendRedirect("/");
    
  }
    /** Stores a table in Datastore. */
public void storeTable(Table table) {
    Entity tableEntity = new Entity("Table");
    tableEntity.setProperty("firstName", table.getFirstName());
    tableEntity.setProperty("lastName", table.getLastName());
    tableEntity.setProperty("email", table.getEmail());
    tableEntity.setProperty("phoneNumber", table.getPhoneNumber());
    tableEntity.setProperty("restName", table.getRestName());
    tableEntity.setProperty("restAdd", table.getRestAdd());
    tableEntity.setProperty("restDescrip", table.getRestDescrip());
    tableEntity.setProperty("dateTime", table.getDateTime());
    tableEntity.setProperty("maxSize", table.getMaxSize());
    tableEntity.setProperty("otherNotes", table.getOtherNotes());
    tableEntity.setProperty("members", table.getMembers());
    tableEntity.setProperty("lat", table.getLat());
    tableEntity.setProperty("lng", table.getLng());
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(tableEntity);
}
 /** Fetches markers from Datastore. */
 private List<Table> getTables() {
    List<Table> tables = new ArrayList<>();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Table");
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      String firstName = (String) entity.getProperty("firstName");
      String lastName = (String) entity.getProperty("lastName");
      String email = (String) entity.getProperty("email");
      String phoneNumber = (String) entity.getProperty("phoneNumber");
      String restName = (String) entity.getProperty("restName");
      String restAdd = (String) entity.getProperty("restAdd");
      String restDescrip = (String) entity.getProperty("restDescrip");
      String dateTime = (String) entity.getProperty("dateTime");
      String maxSize = (String) entity.getProperty("maxSize");
      String otherNotes = (String) entity.getProperty("otherNotes");
      List members = (List) entity.getProperty("members");
      double lat = (double) entity.getProperty("lat");
      double lng = (double) entity.getProperty("lng");


      

      Table table = new Table(firstName, lastName, email, phoneNumber, restName, restAdd, restDescrip, dateTime, maxSize, otherNotes, members, lat, lng);
      tables.add(table);
    }
    return tables;
  }
}
  
