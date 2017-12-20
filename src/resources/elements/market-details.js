import {bindable, inject} from 'aurelia-framework';
import {MarketApi} from '../../services/market-api';

@inject(MarketApi)
export class MarketDetails{

  constructor(marketApi){
    this.marketApi = marketApi;
  }

  activate(params, routeConfig){
    this.loadMarketZ(params.title)
  }

  loadMarket(id){
    this.marketApi.getMarkets().then(markets => {
      this.market =  markets.find(m => m.Id == id);
    });
  }

  loadMarketN(name){
    this.marketApi.getMarkets().then(markets => {
      this.market = markets.find(m => m.title == name);
    });
  }

  loadMarketZ(name) {
    this.marketApi.getMarkets()
      .then(markets => {
        this.market = markets.find(m => m.title == name);

        this.marketApi.loadCountry(this.market.country).then(country => {
          this.selected = country.code ? {"name": country.name, "code": country.code} : {"name": 'Australia', "code": 'AU'};
        });
      });
  }

  countryChanged(evt){
    this.market.country = evt.target.value;
  }

  saveMarket(){
    console.log("saved")
  }
}
