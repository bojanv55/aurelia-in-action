import {bindable, inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import lodash from 'lodash';

@inject(EventAggregator)
export class EditBook{
  @bindable editMode;
  @bindable book;

  constructor(ea){
    this.ea = ea;
    //==
    this.rcl = e => this.temporaryBook.rating = e.rating;
  }

  bind(){
    this.resetTempBook();

    //==
    this.ratingElement.addEventListener("change", this.rcl);
  }

  editModeChanged(newMode, oldMode){
    if(newMode){
      this.resetTempBook();
    }
  }

  @computedFrom('temporaryBook.title', 'temporaryBook.description')
  get canSave(){
    return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
  }

  resetTempBook(){
    this.temporaryBook = Object.assign({}, this.book);
  }

  cancel(){
    this.temporaryBook = this.book;

    //==
    this.starRatingViewModel.applyRating(this.temporaryBook.rating);

    this.toggleEditMode();
  }

  save(){
    this.loading = true;
    this.publishBookSavedEvent();
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
