import app from '../exercise-4.js';
import data from '../data.json';

test('', () => {
  expect(app(data)).toMatchSnapshot();
});
