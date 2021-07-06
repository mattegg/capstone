// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler';
// The describe() function
describe('Testing the submit', () => {
  // The test() function
  test('Testing handleSubmit() ', () => {
    expect(handleSubmit).toBeDefined();
  });
});
