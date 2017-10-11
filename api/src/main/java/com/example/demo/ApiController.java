package com.example.demo;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class ApiController {


  @CrossOrigin
  @RequestMapping(method = RequestMethod.GET, path = "markets")
  Collection<Market> markets() {
    System.out.println("get markets");
    Market m1 = new Market();
    m1.setId(1);
    m1.setTitle("title1");
    m1.setGenre(1);
    m1.setPosjeduje(false);
    m1.setTimesRead(0);
    m1.setRating(3);
    Market m2 = new Market();
    m2.setId(2);
    m2.setTitle("title2");
    m2.setGenre(1);
    m2.setPosjeduje(false);
    m2.setTimesRead(0);
    m2.setRating(3);
    return Arrays.asList(m1, m2);
  }

  @CrossOrigin
  @RequestMapping(method = RequestMethod.POST, path="markets")
  public Market addMarket(@RequestParam(required=false, defaultValue="0") int marketId, @RequestBody Market market){
    System.out.println("added");
    System.out.println(market);
    return market;
  }

  @CrossOrigin
  @RequestMapping(method = RequestMethod.PUT, path="market/{marketId}")
  public Market saveMarket(@RequestParam(required=false, defaultValue="0") int marketId, @RequestBody Market market){
    System.out.println("saved");
    System.out.println(market);
    return market;
  }

  @CrossOrigin
  @RequestMapping(method = RequestMethod.DELETE, path="market/{marketId}")
  public String deleteMarket(@RequestParam(required=false, defaultValue="0") int marketId, @RequestBody Market market){
    System.out.println("deleted");
    System.out.println(market);
    return "deleted";
  }

}
