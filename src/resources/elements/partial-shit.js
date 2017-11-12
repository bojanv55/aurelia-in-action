import {bindable} from 'aurelia-framework';

export class PartialShit{

  constructor(){
    this.message = "some message";
    this.opis = "opis opis opis"; //pojavice se u "<compose" partialu jer on dijeli context ovaj ovdje
  }

}
