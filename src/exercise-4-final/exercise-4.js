import moment from 'moment';
import _ from 'lodash';

export default function monthRaport(data) {
  return _.flow([
    concatData,
    setAllDateToLastDayOfMonth,
    mergeByDate,
    sortByDate,
  ])(data);

  function concatData([aSales, aTargets]) {
    const { data: sales = [] } = aSales;
    const { data: targets = [] } = aTargets;
    return sales.concat(targets);
  }

  function setAllDateToLastDayOfMonth(data) {
    return data.map(setMonthEndDay);

    function setMonthEndDay(row) {
      const date = moment(dateFor(row))
        .endOf('month')
        .format('YYYY-MM-DD');
      return Object.assign(row, { date });
    }
  }

  function mergeByDate(data) {
    const merged = data.reduce(merge, new Map());
    const result = mapToArray(merged);
    return result;

    function merge(m, row) {
      return m.set(dateFor(row), Object.assign(m.get(dateFor(row)) || {}, row));
    }

    function mapToArray(data) {
      return [...data.values()];
    }
  }

  function sortByDate(data) {
    return data.sort(compareByDate);

    function compareByDate(a, b) {
      return moment(dateFor(b)).format('X') - moment(dateFor(a)).format('X');
    }
  }

  function dateFor(row) {
    return row.date;
  }
}
