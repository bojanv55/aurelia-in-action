import {bindable, inject, computedFrom, NewInstance} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';
import {BootstrapFormRenderer} from '../../renderers/bootstrap-form-renderer';
import {ValidationRules, ValidationController} from 'aurelia-validation';

@inject(EventAggregator, NewInstance.of(ValidationController))
export class EditBook{
  @bindable editMode;
  @bindable book;
  @bindable shelves;
  @bindable genres;
  temporaryBook = new Book();

  constructor(ea, controller){
    this.ea = ea;
    this.controller = controller;
    this.controller.addRenderer(new BootstrapFormRenderer());
    //==
    this.rcl = e => this.temporaryBook.rating = e.rating;
    this.saved = false;
    this.editingShelves = false;
  }

  bind(){
    this.resetTempBook();

    //this.selectedShelves = this.shelves.filter(shelf => this.temporaryBook.shelves.indexOf(shelf) !== -1);
    this.selectedGenre = this.genres.find(g => g.id === this.book.genre);

    //==
    this.ratingElement.addEventListener("change", this.rcl);
  }

  toggleEditShelves(){
    this.editingShelves = !this.editingShelves;
  }

  selectedGenreChanged(newVal, oldVal){
    if(!newVal) return;
    this.temporaryBook.genre = newVal.id;
  }

  editModeChanged(newMode, oldMode){
    if(newMode){
      this.resetTempBook();
    }
  }

  @computedFrom('temporaryBook.title', 'temporaryBook.description',
    'temporaryBook.rating','temporaryBook.posjeduje', 'temporaryBook.genre', 'saved',
    'temporaryBook.shelves', 'temporaryBook.timesRead')
  get canSave(){
    //return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
    if(!this.temporaryBook.Id) return false;
    return this.isDirty();
  }

  isDirty(){
    let differences = [];
    _.forIn(this.temporaryBook, (value, key) => {
     return differences.push({different: this.book[key] !== value, key : key});
    });
    return differences.filter(d => d.different).length > 0;
  }


  resetTempBook(){
    this.temporaryBook = Object.assign({}, this.book);
  }

  cancel(){
    this.temporaryBook = this.book;

    //==
    this.starRating.applyRating(this.temporaryBook.rating);

    this.toggleEditMode();
  }

  save(){
    this.controller.validate().then(result => {
      if(result.valid){
        this.loading = true;
        this.publishBookSavedEvent();
      }
    });
  }

  bookSaveComplete(){
    this.loading = false;
    this.saved = true;
    setTimeout(()=>{
      this.saved = false;
      this.toggleEditMode();
    }, 500);
  }

  publishBookSavedEvent(){
    this.ea.publish('save-book', this.temporaryBook);
  }

  attached(){
    this.bscs = this.ea.subscribe(`book-save-complete-${this.book.Id}`, () => this.bookSaveComplete());
  }

  toggleEditMode(){
    this.ea.publish("edit-mode-changed", !this.editMode);
  }

  detached(){
    this.bscs.dispose();

    //==
    this.ratingElement.removeEventListener("change", this.rcl);
  }
}

export class Book{
  title='';
  description='';
}

ValidationRules.customRule('zeroOrPositiveInt', (value, obj) => value>=0, 'vise od 0');
ValidationRules.ensure(a => a.title).required().on(Book);
