import DataStore from 'nedb-promise';

const db = new DataStore();

class ConnectionManager {
  push(notification) {
    console.log(`Send notification: Hello ${notification.name}!`);
  }
}
// class StorageManager {
//   async save(notifications) {
//     const docs = await db.insert(notifications);
//     console.log('Saving docs:', docs);
//   }
//   async hasEntry(notifications) {
//     const docs = await db.find({ name: notifications.name });
//     console.log(`Exists docs ${notifications.name}`, !!docs.length);
//     return !!docs.length;
//   }
// }

// class StorageManager {
//   async save(collection) {
//     const count = collection.length;
//     const maxCount = await db.findOne({ _id: 'maxCount' });
//     if (!!maxCount && maxCount.value < count) {
//       await db.update({ _id: 'maxCount' }, { value: count });
//     }
//     const docs = await db.insert(collection);
//     console.log('Saving docs:', docs);
//   }

//   async hasEntry(entry) {
//     const docs = await db.find({ name: entry.name });
//     console.log(`Exists docs ${entry.name}`, !!docs.length);
//     return !!docs.length;
//   }
// }

export class StorageManager {
  constructor(db) {
    this.db = db;
  }
  async save(collection) {
    await this.insert(collection);
    await this.updateMaxCount(collection);
  }
  async insert(collection) {
    const docs = await this.db.insert(collection);
    console.log('Saving docs:', docs);
  }

  async updateMaxCount(collection) {
    const count = collection.length;
    const maxCount = await this.db.findOne({ _id: 'maxCount' });
    if (!!maxCount && maxCount.value < count) {
      await this.db.update({ _id: 'maxCount' }, { value: count });
      console.log('Saving new max count:', count);
    }
  }
  async hasEntry(entry) {
    const docs = await this.db.find({ name: entry.name });
    console.log(`Exists docs: ${entry.name}`, !!docs.length);
    return !!docs.length;
  }
}

async function init() {
  await db.insert([{ value: 0, _id: 'maxCount' }]);
  await db.insert([{ name: 'WarsawJs' }]);
}

global.connection = new ConnectionManager();
// punktem dostępowym jest stan obiektu global
global.storage = new StorageManager(db);

export default async function app() {
  // Symulacja wielu linijek 💩 kodu
  await init();

  await send([{ name: 'Anonymous' }, { name: 'WarsawJs' }, { name: 'User' }]);
}

// async function send(aNotifications) {
//   for (let i = 0; i < aNotifications.length; i++) {
//     const notification = aNotifications[i];
//     connection.push(notification);
//   }
//   await storage.save(aNotifications);
// }

// async function send(aNotifications) {
//   const notificationToAdd = [];
//   for (let i = 0; i < aNotifications.length; i++) {
//     const notification = aNotifications[i];
//     if (!(await storage.hasEntry(notification))) {
//       connection.push(notification);
//       notificationToAdd.push(notification);
//     }
//   }
//   await storage.save(notificationToAdd);
// }

async function send(aNotifications) {
  const unique = await getUnique(aNotifications);
  for (let i = 0; i < unique.length; i++) {
    const notification = unique[i];
    global.connection.push(notification);
  }
  await global.storage.save(unique);
}

export async function getUnique(aNotifications) {
  const result = [];
  for (let i = 0; i < aNotifications.length; i++) {
    const notification = aNotifications[i];
    if (!(await global.storage.hasEntry(notification))) {
      result.push(notification);
    }
  }
  return result;
}
