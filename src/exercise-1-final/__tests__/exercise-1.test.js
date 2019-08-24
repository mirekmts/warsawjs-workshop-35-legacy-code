import invoice from '../invoices.json';
import vehicles from '../vehicles.json';
import statement, { htmlStatement } from '../statement.js';

test('print statement in text', () => {
  const result = statement(invoice[0], vehicles);
  expect(result).toMatchSnapshot();
});

test('print statement in html', () => {
  const result = htmlStatement(invoice[0], vehicles);
  expect(result).toMatchSnapshot();
});
