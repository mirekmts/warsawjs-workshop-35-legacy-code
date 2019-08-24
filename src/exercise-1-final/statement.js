import createStatementData from './create-statement-data.js';

export default function statement(invoice, vehicles) {
  const statementData = createStatementData(invoice, vehicles);

  return renderPlainText(statementData, vehicles);
}

export function htmlStatement(invoice, vehicles) {
  const statementData = createStatementData(invoice, vehicles);

  return renderHtml(statementData, vehicles);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let ride of data.rides) {
    result += ` ${ride.vehicle.name}: ${pln(ride.amount)} (${
      ride.minutes
    } minutes)\n`;
  }
  result += `Amount owed is ${pln(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>vehicle</th><th>minutes</th><th>cost</th></tr>\n';
  for (let ride of data.rides) {
    result += `<tr><td>${ride.vehicle.name}</td><td>${ride.minutes}</td>`;
    result += `<td>${pln(ride.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${pln(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function pln(number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  }).format(number / 100);
}
