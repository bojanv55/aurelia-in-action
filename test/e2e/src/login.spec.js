import {PageObjectApp} from "./app.po";
import {PageObjectLogin} from "./login.po";

describe("my-books", function () {
  let poLogin;
  let poApp;
  beforeEach(() => {
    poApp = new PageObjectApp();
    poLogin = new PageObjectLogin();
    browser.loadAndWaitForAureliaPage("http://localhost:8080");
  });
  it("should load the page and display the initial page title", () => {
    expect(poApp.getCurrentPageTitle()).toBe("login | Markets");
  });
  it("should display a header", () => {
    expect(poLogin.getHeader()).toBe("markets");
  });
  // it("it should fail to log in with invalid password", () => {
  //   poLogin.setUsername("123");
  //   poLogin.setPassword("123");
  //   poLogin.pressSubmitButton();
  //   expect(poLogin.getLoginError()).toBe(
  //     "Authentication failed. Invalid user name or password."
  //   );
  // });
  it("it should login with valid username and password", () => {
    poLogin.setUsername("123");
    poLogin.setPassword("123");
    poLogin.pressSubmitButton();
    browser.sleep(200);
    expect(poApp.getCurrentPageTitle()).toBe("login | Markets");
  });
});
