package com.google.codeu.data;

public class Marker {

  private double lat;
  private double lng;
  private String name;
  private String address;

  public Marker(double lat, double lng, String name, String address) {
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.address = address;
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }

  public String getName() {
    return name;
  }
  public String getAddress(){
    return address;
  }
}