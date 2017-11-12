package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Market {
  int Id;
  String title;
  int rating;
  boolean posjeduje;
  int genre;
  int timesRead;

  @JsonProperty("Id")
  public int getId() {
    return Id;
  }

  public void setId(int id) {
    Id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public boolean isPosjeduje() {
    return posjeduje;
  }

  public void setPosjeduje(boolean posjeduje) {
    this.posjeduje = posjeduje;
  }

  public int getGenre() {
    return genre;
  }

  public void setGenre(int genre) {
    this.genre = genre;
  }

  public int getTimesRead() {
    return timesRead;
  }

  public void setTimesRead(int timesRead) {
    this.timesRead = timesRead;
  }

  @Override
  public String toString() {
    return "Market{" +
      "Id=" + Id +
      ", title='" + title + '\'' +
      ", rating=" + rating +
      ", posjeduje=" + posjeduje +
      ", genre=" + genre +
      ", timesRead=" + timesRead +
      '}';
  }
}
