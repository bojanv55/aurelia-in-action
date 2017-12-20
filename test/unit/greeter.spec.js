import {Greeter} from './greeter'

describe('The Grtr', () => {
  it("return cao", function () {
    let g = new Greeter();
    expect(g.message).toBe('Cao');
  })
});
