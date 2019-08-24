import DataStore from 'nedb-promise';

const db = new DataStore();

class ConnectionManager {
  push(notification) {
    console.log(`Send notification: Hello ${notification.name}!`);
  }
}

class StorageManager {
  async save(notifications) {
    const docs = await db.insert(notifications);
    console.log('Saving docs:', docs);
  }
  async hasEntry(notifications) {
    const docs = await db.find({ name: notifications.name });
    console.log(`Exists docs ${notifications.name}`, !!docs.length);
    return !!docs.length;
  }
}

async function init() {
  await db.insert([{ name: 'WarsawJs' }]);
}

global.connection = new ConnectionManager();
global.storage = new StorageManager();

export default async function app() {
  // Symulacja wielu linijek 💩 kodu
  await init();

  await send([{ name: 'Anonymous' }, { name: 'WarsawJs' }, { name: 'User' }]);
}

async function send(aNotifications) {
  for (let i = 0; i < aNotifications.length; i++) {
    const notification = aNotifications[i];
    global.connection.push(notification);
  }
  await global.storage.save(aNotifications);
}
