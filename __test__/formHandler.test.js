// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler';

describe('testing handlesubmit function to be defined', () => {
  test('ensure handleSubmit function exists', () => {
    expect(handleSubmit).toBeDefined();
  });
});
