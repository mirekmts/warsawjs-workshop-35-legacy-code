import moment from 'moment';

export default function app([sales, targets]) {
  const { data: salesData = [] } = sales;
  const { data: targetsData = [] } = targets;
  return [
    ...salesData
      .concat(targetsData)
      .map(i => {
        const date = moment(i.date)
          .endOf('month')
          .format('YYYY-MM-DD');
        return Object.assign(i, { date });
      })
      .reduce(
        (m, o) => m.set(o.date, Object.assign(m.get(o.date) || {}, o)),
        new Map()
      )
      .values(),
  ].sort((a, b) => {
    return moment(b.date).format('X') - moment(a.date).format('X');
  });
}
