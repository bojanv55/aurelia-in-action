export class SearchBoldValueConverter{
  toView(val, termin){
    if(!termin) return val;
    return val.replace(new RegExp(termin, 'gi'), `<b>$&</b>`);
  }
}
