// Import the js file to test
import { checkForName } from '../src/client/js/nameChecker.js';


describe('testing a valid url', () => {
  test('testing checkForName', () => {
    expect(checkForName('https://www.digitalchaos.ca/')).toBe(true);
  });
  test('testing checkForName', () => {
    expect(
      checkForName('http://www.thewpgeek.com')
    ).toBe(true);
  });
  test('testing checkForName', () => {
    expect(checkForName('google')).toBe(false);
  });
});