export class TestHelper{
  static mockResponseAsync(body){
    return Promise.resolve({
      json: () => Promise.resolve(body)
    });
  }

  static shadowRoot(querySelector){
    return document.querySelector(querySelector).shadowRoot;
  }

  static clickAndWait(element){
    element.click();
    return new Promise(setTimeout);
    //return new Promise((r) => {return setTimeout(r);});
    //return new Promise();
  }

  static fireJQueryEventAndWait(selector, eventType){
    $(selector)[eventType]();
    return new Promise(setTimeout);
    //return new Promise((r) => { return setTimeout(r); });
    //return new Promise();
  }
}
