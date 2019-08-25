export default function app(invoice, vehicles) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  }).format;
  for (let ride of invoice.rides) {
    const vehicle = vehicles[ride.vehicleId];
    let thisAmount = 0;
    switch (vehicle.type) {
      case 'eco':
        thisAmount = 500;
        if (ride.minutes > 30) {
          thisAmount += 20 * (ride.minutes - 30);
        }
        break;
      case 'electric':
        thisAmount = 1000;
        if (ride.minutes > 10) {
          thisAmount += 500 + 150 * (ride.minutes - 10);
        }
        thisAmount += 50 * ride.minutes;
        break;
      default:
        throw new Error(`unknown type: ${vehicle.type}`);
    }
    // add volume credits
    volumeCredits += Math.max(ride.minutes - 30, 0);
    // add extra credit for every ten eco minutes
    if ('eco' === vehicle.type) volumeCredits += Math.floor(ride.minutes / 5);
    // print line for this ride
    result += ` ${vehicle.name}: ${format(thisAmount / 100)} (${
      ride.minutes
    } minutes)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
