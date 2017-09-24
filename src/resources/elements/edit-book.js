import {bindable, inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import lodash from 'lodash';

@inject(EventAggregator)
export class EditBook{
  @bindable editMode;
  @bindable book;

  constructor(ea){
    this.ea = ea;
  }

  bind(){
    this.resetTempBook();
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
  }
}
