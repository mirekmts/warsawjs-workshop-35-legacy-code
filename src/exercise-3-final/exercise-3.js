import './utils.js';

class Totalable {
  find() {
    throw 'subclass responsible';
  }
  total(query, on = 'minutes') {
    return this.find(query).reduce((total, p) => total + p[on], 0);
  }
}

class RidesStore extends Totalable {
  find(query) {
    console.log('Run prod query:', query);
    return [{ minutes: 3 }, { minutes: 4 }, { minutes: 5 }];
  }
}

class BonusStore extends Totalable {
  find(query) {
    console.log('Run prod query:', query);
    return [{ minutes: 0 }, { minutes: 1 }, { minutes: 2 }];
  }
}

class DateRange {
  constructor(startDate, endDate) {
    this.startDate = startDate || this.now;
    this.endDate = endDate || new Date(this.startDate).subtractDays(1);
  }
  get range() {
    return { $gte: this.startDate, $lte: this.endDate };
  }
  get weekRange() {
    const endDate = new Date(this.startDate).addDays(7);
    return { $gte: this.startDate, $lte: endDate };
  }
  get now() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDay());
  }
}

export class Statement {
  constructor(db) {
    this.db = db;
  }
  async ridesTotal(startDate, endDate) {
    const range = new DateRange(startDate, endDate).range;
    return await this.db.total({ date: range });
  }
}

export class Raport {
  constructor(db) {
    this.db = db;
  }
  async weeklyRidesTotal(startDate) {
    const range = new DateRange(startDate).weekRange;
    return await this.db.total({ date: range });
  }
}

export class Bonus {
  constructor(db) {
    this.db = db;
  }
  async earnedTotal() {
    const range = new DateRange().range;
    return await this.db.total({ date: range });
  }
}

const db = {};
db.rides = new RidesStore();
db.bonus = new BonusStore();

function totalable(find) {
  return (query, on = 'minutes') => {
    return find(query).reduce((total, p) => total + p[on], 0);
  };
}

function find(query) {
  console.log('Run prod query:', query);
  return [{ minutes: 3 }, { minutes: 4 }, { minutes: 5 }];
}

function weekRange(startDate) {
  const endDate = new Date(startDate).addDays(7);
  return { date: { $gte: startDate, $lte: endDate } };
}

const totalizableFind = totalable(find);

export default async function app() {
  const statement = new Statement(db.rides);
  statement.ridesTotal(
    new Date(2019, 8, 1).subtractDays(60),
    new Date(2019, 8, 1)
  );

  const total = totalizableFind(weekRange(new Date()));
  console.log({ total });
  const raport = new Raport(db.rides);
  raport.weeklyRidesTotal(new Date(2019, 8, 1));

  const bonus = new Bonus(db.bonus);
  bonus.earnedTotal();
}
