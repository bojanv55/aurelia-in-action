export class BookStatusValueConverter{
  toView(val){
    if(val%3===0){
      return 'fa-meh-o';
    }
    if(val%2===0){
      return 'fa-smile-o';
    }
    return 'fa-frown-o';
  }
}
