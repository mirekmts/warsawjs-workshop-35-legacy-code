import invoice from './invoices.json';
import vehicles from './vehicles.json';
import app from './exercise-1-start.js';

const result = app(invoice[0], vehicles);

console.log(result);
