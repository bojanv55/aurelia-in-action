import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class MarketApi{
  constructor(httpClient) {
    this.httpClient = httpClient;

    const baseUrl = 'http://localhost:8333/api/';

    this.httpClient.configure(config => {
      config.withBaseUrl(baseUrl);
    });
  }

  loadCountry(country){
    return this.httpClient.fetch(`countries`)
      .then(res => res.json())
      .then(count => count.find(c => c.code == country.code))
      .catch(err => {
      })
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
}
