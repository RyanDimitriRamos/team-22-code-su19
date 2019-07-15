package com.google.codeu.data;

import java.util.List;

public class Table{
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String restName;
    private String restAdd;
    private String restDescrip;
    private String dateTime;
    private String maxSize;
    private String otherNotes;
    private List<String> members;

    public Table(String firstName, String lastName, String email, String phoneNumber, String restName, String restAdd, String restDescrip, String dateTime, String maxSize, String otherNotes, List<String> members){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.restName = restName;
        this.restAdd = restAdd;
        this.restDescrip = restDescrip;
        this.dateTime = dateTime;
        this.maxSize = maxSize;
        this.otherNotes = otherNotes;
        this.members = members;
    }

    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public String getEmail(){
        return email;
    }
    public String getPhoneNumber(){
        return phoneNumber;
    }
    public String getRestName(){
        return restName;
    }
    public String getRestAdd(){
        return restAdd;
    }
    public String getRestDescrip(){
        return restDescrip;
    }
    public String getDateTime(){
        return dateTime;
    }
    public String getMaxSize(){
        return maxSize;
    }
    public String getOtherNotes(){
        return otherNotes;
    }

    public List<String> getMembers(){
        return members;
    }
}
