import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
  constructor(httpClient){
    this.httpClient = httpClient;
    this.simulatedLatency = 500;
  }

  getShelves(){
    let shelves = ["Jedan", "Dva", "Tri"];
    return this.simulatedFetch(shelves);
  }

  getGenres(){
    let genres = [{id:1, name:"Marko"},{id:2,name:"Neko2"}];
    return this.simulatedFetch(genres);
  }

  getBooks(){
    return this.httpClient.fetch('books.json')
      .then(response => response.json())
      .then(books => {
        return books;
      });
  }

  simulatedFetch(result){
    return new Promise(resolve => {
      setTimeout(()=> {
        resolve(result);
      }, this.simulatedLatency);
    });
  }

  saveBook(book){
    return this.simulatedFetch(book);
  }
}
