import {inject, computedFrom, bindable, observable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {BookApi} from '../../services/book-api';
import {EventAggregator} from 'aurelia-event-aggregator';
import lodash from 'lodash';

@inject(BookApi, BindingSignaler, EventAggregator)
export class Books {
  @bindable books = [];
  @observable bookTitle = "";

  //method name is important
  //prati promjene na bookTitle i proslijedjuje odje staru u novu vrijednost
  bookTitleChanged(newVal, oldVal){
    console.log(`Book title changed, Old: ${oldVal} and new ${newVal}`);
  }

  constructor(bookApi, bindingSignaler, eventAggregator) {
    //this.books = [];
    //this.bookTitle = '';
    this.bookApi = bookApi;
    this.bindingSignaler = bindingSignaler;
    this.eventAggregator = eventAggregator;
  }

  attached(){
    //this.knjigaSlusaj = this.eventAggregator.subscribe('knjiga-uklonjena',
    //  indeks => this.books.splice(indeks, 1));
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    this.brs = this.eventAggregator.subscribe('book-removed', bI => this.removeBook(bI));
    this.bss = this.eventAggregator.subscribe("save-book", b => this.bookSaved(b));
  }

  bookSaved(b){
    this.bookApi.saveMarket(b).then((sb)=>this.eventAggregator.publish(`book-save-complete-${sb.Id}`));
  }

  detached(){
    //this.knjigaSlusaj.dispose();
    this.brs.dispose();
    this.bss.dispose();
  }

  @computedFrom("bookTitle.length")
  get titleIsEmpty(){
    return this.bookTitle.length === 0;
  }

  removeBook(toRem){
    let bindex = _.findIndex(this.books, book => {return book.Id === toRem.Id; });
    this.books.splice(bindex, 1);
  }

  // refreshSignal(){
  //   this.bindingSignaler.signal('title-is-empty-signal');
  // }

  addBook(){
    this.books.push({Id: this.books.length+1, title: this.bookTitle});
    this.bookTitle = "";
    console.log("Book List", this.books);
  }

  bind(){
    this.bookApi.getMarkets().then(savedBooks => this.books = savedBooks);
    this.bookApi.getGenres().then(genres => this.genres = genres);
    this.bookApi.getShelves().then(shelves => this.shelves = shelves);
  }
}
