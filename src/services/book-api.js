import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi {
  constructor(httpClient) {
    this.httpClient = httpClient;

    const baseUrl = 'http://localhost:8333/api/';

    this.httpClient.configure(config => {
      config.withBaseUrl(baseUrl);
    });
  }

  getShelves() {
    let shelves = ["Jedan", "Dva", "Tri"];
    return this.simulatedFetch(shelves);
  }

  getGenres() {
    let genres = [{id: 1, name: "Marko"}, {id: 2, name: "Neko2"}];
    return this.simulatedFetch(genres);
  }

  addMarket(market) {
    return this.httpClient.fetch('markets', {
      method: 'post',
      body: json(market)
    })
      .then(resp => resp.json())
      .then(createdM => {
        return createdM;
      })
      .catch(error => {
        console.log('Error adding market!');
        return [];
      });
  }

  deleteMarket(market){
    return this.httpClient.fetch(`market/${market.id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(msg => { return msg; })
      .catch(error => {
        console.log('Error deleting market!');
      });
  }

  saveMarket(market){
    return this.httpClient.fetch(`market/${market.id}`, {
      method: 'put',
      body: json(market)
    })
      .then(resp => resp.json())
      .then(savedM => {
        return savedM;
      })
      .catch(error => {
        console.log('Error saving market!');
        return [];
      });
  }

  getMarkets() {
    return this.httpClient.fetch('markets')
      .then(response => response.json())
      .then(markets => {
        return markets;
      })
      .catch(error => {
        console.log('Error getting markets!');
        return [];
      });
  }

  simulatedFetch(result) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(result);
      }, this.simulatedLatency);
    });
  }
}
