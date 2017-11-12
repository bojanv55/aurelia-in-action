import {inject,bindable} from 'aurelia-framework';

export class AuForm{

  constructor() {
    this.fields = [
      {
        name: "Title",
        value: "War and Peaces",
        controlType: PLATFORM.moduleName('./au-text-box'),
        placeholder: 'Enter a title'
      },
      {
        name: "Desccription",
        value: "A rather long",
        controlType: PLATFORM.moduleName('./au-text-area')
      }
    ];
  }

  addBook(){
    alert(`market added ${this.fields[0].value}`);
  }

}
