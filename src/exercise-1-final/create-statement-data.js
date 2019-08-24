export default function createStatementData(invoice, vehicles) {
  const result = {};
  result.customer = invoice.customer;
  result.rides = invoice.rides.map(enrichRides);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichRides(ride) {
    const result = Object.assign({}, ride);
    const calculator = createRideCalculator(ride, vehicleFor(result));
    result.vehicle = calculator.vehicle;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function vehicleFor(ride) {
    return vehicles[ride.vehicleId];
  }

  function totalAmount(data) {
    return data.rides.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.rides.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

class RideCalculator {
  constructor(ride, vehicle) {
    this.ride = ride;
    this.vehicle = vehicle;
  }

  get amount() {
    throw new Error('subclass responsibility');
  }

  get volumeCredits() {
    return Math.max(this.ride.minutes - 30, 0);
  }
}

function createRideCalculator(aRide, aVehicle) {
  switch (aVehicle.type) {
    case 'eco':
      return new EcoCalculator(aRide, aVehicle);
    case 'electric':
      return new ElectricCalculator(aRide, aVehicle);
    default:
      throw new Error(`unknown type: ${aRide.type}`);
  }
}

class EcoCalculator extends RideCalculator {
  get amount() {
    let result = 500;
    if (this.ride.minutes > 30) {
      result += 20 * (this.ride.minutes - 30);
    }
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.ride.minutes / 5);
  }
}

class ElectricCalculator extends RideCalculator {
  get amount() {
    let result = 1000;
    if (this.ride.minutes > 10) {
      result += 500 + 150 * (this.ride.minutes - 10);
    }
    result += 50 * this.ride.minutes;
    return result;
  }
}
