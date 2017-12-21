import {FilterValueConverter, FitlerValueConverter} from '../../src/resources/value-converters/filter'
import TestData from '../unit-test-data'

describe("filter val conv", () => {
  let sut;

  beforeEach(() => {
    sut = new FilterValueConverter();
  });

  it("filter list", () => {
    const markets = [TestData.Books.WarAndPeace, TestData.Books.Oliver];
    const expectedResult = [TestData.Books.Oliver];
    const result = sut.toView(markets, "Ol");
    expect(result).toEqual(expectedResult);
  });
});
