export class IstakniValueConverter{
  toView(ulaz){
    if(ulaz){
      return `<span style="background-color: #eceeef; padding: 10px">${ulaz}</span>`;
    }
    return ulaz;
  }
}
