import '../imports/api/games.js'
import '../imports/api/currentstate.js'
import '../imports/api/neighborhoods.js'
import '../imports/api/workplaces.js'
import { Meteor } from 'meteor/meteor';
import { CurrentState } from '../imports/api/currentstate.js';

if (CurrentState.find().count() === 0) {
  CurrentState.insert({currentGame: 1});
}


