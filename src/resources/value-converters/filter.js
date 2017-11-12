export class FilterValueConverter{
  toView(niz, termin){
    return niz.filter((stavka) => {
      return termin && termin.length > 0 ? this.mecujel(termin, stavka) : true;
    })
  }

  mecujel(termin, stavka){
    let itemVal = stavka.title;

    if(!itemVal) return false;

    return itemVal.toUpperCase().indexOf(termin.toUpperCase()) !== -1;
  }
}
