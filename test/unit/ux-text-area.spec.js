import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import TestData from "../unit-test-data";
import {TestHelper} from "./test-helper";

describe("uxtxtarea", () => {
  let component;
  let bookDescription = TestData.Markets[0].title;

  beforeEach(() => {
    component = StageComponent.withResources(PLATFORM.moduleName("resources/components/ux-text-area"))
      .inView(`<ux-text-area text-content.bind="description"></ux-text-area>`)
      .boundTo({description: bookDescription});
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  function getTextAreaElement(){
    return TestHelper.shadowRoot("ux-text-area");
  }

  function getTextBlockElement(){
return TestHelper.shadowRoot("ux-text-area")
  .querySelector(".text-block");
  }

  function changeTextAreaValue(value){
let componentElement = getTextAreaElement();
    let textArea = componentElement.querySelector('textarea');
    textArea.value = value;
    let event = new Event('change');
    textArea.dispatchEvent(event);
  }

  function editText(){
return TestHelper.clickAndWait(getTextBlockElement());
  }

  it("inited textbox on load", done => {
    component.create(bootstrap)
      .then(() => {
      let actualDesc = getTextBlockElement().innerHTML;
      expect(bookDescription).toBe(actualDesc);
      done();
      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  it("transition to textarea on click", done => {
    component
      .create(bootstrap)
      .then(() => {

        editText().then(_ => {

          let actualDescription = getTextAreaElement()
            .querySelector('textarea')
            .value;

          expect(bookDescription).toBe(actualDescription);
          done();
        });

      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  function clickOkButton(){
    let okButton = TestHelper.shadowRoot("ux-text-area")
      .querySelector("button.ok");
    return TestHelper.clickAndWait(okButton);
  }

  it("it saves changes when ok button is clicked", done => {
    component
      .create(bootstrap)
      .then(() => {

        const updatedValue = 'Updated value';

        editText().then(_ => {

          changeTextAreaValue(updatedValue);

          clickOkButton().then(_ => {

            let actualDescription = getTextBlockElement().innerHTML;

            expect(actualDescription).toBe(updatedValue);
            done();

          });

        });

      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  afterEach(() => {
    component.dispose();
  });
});
