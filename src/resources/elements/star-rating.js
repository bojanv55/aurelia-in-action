import {inject, bindable} from 'aurelia-framework';

@inject(Element)
export class StarRating{
  @bindable rating;

  constructor(element){
    this.element = element;
    this.stars = [
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false },
      { type: '-o', displayType: '-o', rated: false }
    ];
    this.hovered = false;
  }

  bind(){
    this.applyRating(this.rating);
  }

  applyRating(rating){
    this.stars.forEach((s,i) => this.rateStar(s, rating, i));
  }

  rateStar(star, rating, index){
    if(index<rating) this.toggleOn(star);
    else{
      this.toggleOff(star);
    }
  }

  toggleOn(star){
    star.displayType = '';
    star.type = '';
    star.rated = true;
  }

  toggleOff(star){
    star.displayType = '-o';
    star.type = '-o';
    star.rated = false;
  }

  ratingFromIndex(index, star){
    if(index===0 && star.rated) return 0;
    return index+1;
  }

  rate(index){
    let rating = this.ratingFromIndex(index, this.stars[0]);
    this.rating = rating;
    this.applyRating(rating);
    this.raiseChangedEvent();
  }

  mouseOut(hoverIndex){
    if(!this.hovered) return;
    this.hovered = false;
    this.applyHoverState(hoverIndex);
  }

  applyHoverState(hoverIndex){
    this.stars.forEach((s,i) => {
      if(!this.shouldApplyHover(i,hoverIndex,s)) return;
      if(this.hovered){
        this.toggleDisplayOn(s);
      }
      else{
        this.toggleDisplayOff(s);
      }
    });
  }

  mouseOver(hoverIndex){
    if(this.hovered) return;
    this.hovered = true;
    this.applyHoverState(hoverIndex);
  }

  toggleDisplayOff(star){
    star.displayType = star.type;
  }

  toggleDisplayOn(star){
    star.displayType = '';
  }

  shouldApplyHover(sI, hI, s){
    return sI  <= hI && !s.rated;
  }

  raiseChangedEvent(){
    let cE = new CustomEvent('change', {rating: this.rating});
    this.element.dispatchEvent(cE);
  }
}
