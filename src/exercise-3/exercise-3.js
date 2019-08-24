import './utils.js';

class RidesStore {
  find(query) {
    console.log('Run prod query:', query);
    return [{ minutes: 3 }, { minutes: 4 }, { minutes: 5 }];
  }
}

class BonusStore {
  find(query) {
    console.log('Run prod query:', query);
    return [{ minutes: 0 }, { minutes: 1 }, { minutes: 2 }];
  }
}

const db = {};
db.rides = new RidesStore();
db.bonus = new BonusStore();

export default function app() {
  const statement = new Statement(db.rides);
  statement.ridesTotal(new Date().subtractDays(60), new Date());

  const raport = new Raport(db.rides);
  raport.weeklyRidesTotal(new Date());

  const bonus = new Bonus(db.bonus);
  bonus.earnedTotal();
}

class Statement {
  async ridesTotal(startData, endDate) {
    return await db.rides.find({ date: { $gte: startData, $lte: endDate } });
  }
}

class Raport {
  async weeklyRidesTotal(startData) {
    const endDate = new Date(startData).addDays(7);
    return await db.rides.find({ date: { $gte: startData, $lte: endDate } });
  }
}

class Bonus {
  async earnedTotal(params = {}) {
    const startData = params.startData || new Date();
    const endDate = params.startData || new Date().subtractDays(1);
    return await db.bonus.find({ date: { $gte: startData, $lte: endDate } });
  }
}
