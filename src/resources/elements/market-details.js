import {bindable, inject} from 'aurelia-framework';
import {MarketApi} from '../../services/market-api';

@inject(MarketApi)
export class MarketDetails{
  constructor(marketApi){
    this.marketApi = marketApi;
  }

  activate(params, routeConfig){
    this.loadMarket(params.Id)
  }

  loadMarket(id){
    this.marketApi.getMarkets().then(markets => {
      this.market =  markets.find(m => m.Id == id);
    });
  }

  saveMarket(){
    console.log("saved")
  }
}
