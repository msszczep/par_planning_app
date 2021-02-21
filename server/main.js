import '../imports/api/games.js'
import '../imports/api/usermetadata.js'
import '../imports/api/neighborhoods.js'
import '../imports/api/workplaces.js'
import { Meteor } from 'meteor/meteor';
import { Games } from '../imports/api/games.js';
import { Workplaces } from '../imports/api/workplaces.js';
import { Neighborhoods } from '../imports/api/neighborhoods.js';

if (Games.find().count() === 0) {
  Games.insert({createdAt: Date()});
}
 
if (Workplaces.find().count() === 0) {
  Workplaces.insert({createdAt: Date(), name: "Bakery"});
  Workplaces.insert({createdAt: Date(), name: "Brewery"});
  Workplaces.insert({createdAt: Date(), name: "Pizzeria"});
}

if (Neighborhoods.find().count() === 0) {
  Neighborhoods.insert({createdAt: Date(), name: "Goldman Green"});
  Neighborhoods.insert({createdAt: Date(), name: "Rocker Hill"});
  Neighborhoods.insert({createdAt: Date(), name: "Bakunin Bay"});
}
