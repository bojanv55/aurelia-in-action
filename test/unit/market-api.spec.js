import {MarketApi} from "../../src/services/market-api";
import {TestHelper} from "./test-helper";
import TestData from '../unit-test-data';

describe("userapi serv", () => {
  let httpClient;
  let sut;
  let countries= TestData.Countries;
  let users = TestData.Markets;

  let testUsers = beforeEach(() => {
    httpClient = jasmine.createSpyObj("HttpClient", ["fetch","configure"]);
    sut = new MarketApi(httpClient);
  });

  it("load country", done => {
    httpClient.fetch.and.returnValue(
      TestHelper.mockResponseAsync(countries)
    );
    sut.loadCountry({code: "AU"})
      .then(res => expect(res).toEqual(countries[0]))
      .then(() => expect(httpClient.fetch).toHaveBeenCalledWith("countries"))
      .then(done);
  });
});
