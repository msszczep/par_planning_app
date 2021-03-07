import '../imports/api/actors.js'
import '../imports/api/councils.js'
import '../imports/api/iterationcounter.js'
import '../imports/api/iterationdata.js'
import '../imports/api/prices.js'
import { Meteor } from 'meteor/meteor';
import { Councils } from '../imports/api/councils.js';
import { IterationCounter } from '../imports/api/iterationcounter.js';
import { Prices } from '../imports/api/prices.js';

if (IterationCounter.find().count() === 0) {
  IterationCounter.insert({createdAt: Date(), iteration: 1});
}
 
if (Councils.find().count() === 0) {
  Councils.insert({createdAt: Date(), type: "w", name: "Bakery"});
  Councils.insert({createdAt: Date(), type: "w", name: "Brewery"});
  Councils.insert({createdAt: Date(), type: "w", name: "Pizzeria"});
  Councils.insert({createdAt: Date(), type: "c", name: "Goldman Green"});
  Councils.insert({createdAt: Date(), type: "c", name: "Rocker Hill"});
  Councils.insert({createdAt: Date(), type: "c", name: "Bakunin Bay"});
}

if (Prices.find().count() === 0) {
  Prices.insert({iteration: 1, pizza: 10, beer: 10, bread: 10, labor: 10, wheat: 10});
}
