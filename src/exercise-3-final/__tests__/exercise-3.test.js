import { Statement } from '../exercise-3.js';
import '../utils.js';

// describe('Statement', () => {
//   test('should return total ride minutes ', async () => {
//     const statement = new Statement();
//     const startDate = new Date();
//     const endDate = new Date().subtractDays(10);
//     const total = await statement.ridesTotal(startDate, endDate);
//     expect(total).toBe(12);
//   });
// });

class Totalizable {
  total() {
    return 10;
  }
}
describe('Statement', () => {
  test('should return total ride minutes ', async () => {
    const model = new Totalizable();
    const statement = new Statement(model);
    const startDate = new Date();
    const endDate = new Date().subtractDays(10);
    const total = await statement.ridesTotal(startDate, endDate);
    expect(total).toBe(10);
  });
});
