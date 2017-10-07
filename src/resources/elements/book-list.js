import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BookList{
  @bindable books;
  @bindable shelves;
  @bindable genres;

  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }

  removeBook(index){
    //this.books.splice(index, 1);
    this.eventAggregator.publish('knjiga-uklonjena', index);
  }
}
