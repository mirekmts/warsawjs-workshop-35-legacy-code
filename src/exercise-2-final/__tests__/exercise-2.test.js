import { getUnique, StorageManager } from '../exercise-2.js';

describe('getUnique', () => {
  test('should omit exists entry', async () => {
    global.storage.hasEntry = function hasEntry() {
      return true;
    };
    const notification = [{ name: 'Tester' }];
    const result = await getUnique(notification);
    expect(result.length).toBe(0);
  });

  test('should return all entry', async () => {
    global.storage.hasEntry = function hasEntry() {
      return false;
    };
    const notification = [{ name: 'Tester' }];
    const result = await getUnique(notification);
    expect(result.length).toBe(1);
  });
});

describe('StorageManager', () => {
  test('updateMaxCount should update max count', async () => {
    const maxCount = { value: 0 };
    const db = {};
    db.findOne = () => maxCount;
    db.update = (...args) => (maxCount.value = args[1].value);
    const storage = new StorageManager(db);
    const notification = [{ name: 'Tester' }];
    await storage.updateMaxCount(notification);
    expect(maxCount.value).toBe(1);
  });

  test('updateMaxCount should not update max count', async () => {
    const findOne = jest.fn().mockImplementation(() => ({ value: 1 }));
    const update = jest.fn();
    const db = { findOne, update };
    const storage = new StorageManager(db);
    const notification = [{ name: 'Tester' }];

    await storage.updateMaxCount(notification);

    expect(findOne).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(0);
  });
});
