import {bindable, inject} from 'aurelia-framework';
import {MarketApi} from '../../services/market-api';

@inject(MarketApi)
export class Markets{
  constructor(marketApi){
    this.marketApi = marketApi;
  }

  bind(){
    this.loadMarkets();
  }

  loadMarkets(){
    this.marketApi.getMarkets().then(markets => {
      this.markets = markets;
    });
  }
}
