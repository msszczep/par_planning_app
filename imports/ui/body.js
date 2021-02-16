import { Template } from 'meteor/templating';
import { Games } from '../api/games.js';
import { CurrentState } from '../api/currentstate.js';
import { Neighborhoods } from '../api/neighborhoods.js';
import { Workplaces } from '../api/workplaces.js';

import './body.html';

Template.itemsList.helpers({
  gamesToShow() {
    return Games.find({});
  },

  neighborhoodsToShow() {
    return Neighborhoods.find({});
  },

  workplacesToShow() {
    return Workplaces.find({});
  },

  currentState() {
    return CurrentState.find({});
  }
});

Template.body.events({
  'click .addgame' (event) {
    event.preventDefault();

    Games.insert({createdBy: Accounts.user()._id, createdAt: Date()});
  },

  'click .addworkplace' (event) {
    event.preventDefault();

    Workplaces.insert({createdBy: Accounts.user()._id, createdAt: Date()});
  },

  'click .addneighborhood' (event) {
    event.preventDefault();

    Neighborhoods.insert({createdBy: Accounts.user()._id, createdAt: Date()});
  },

  'click .joingame' (event) {
    event.preventDefault();
    c = CurrentState.find({}).fetch({})[0];
    const target = event.target;

    CurrentState.update(c._id, {$set: {currentGame: target.value},});
  }, 

  'click .joinneighborhood' (event) {
    event.preventDefault();
    c = CurrentState.find({}).fetch({})[0];
    const target = event.target;

    CurrentState.update(c._id, {$set: {currentNeighborhood: target.value},});
  },

  'click .joinworkplace' (event) {
    event.preventDefault();
    c = CurrentState.find({}).fetch({})[0];
    const target = event.target;

    CurrentState.update(c._id, {$set: {currentWorkplace: target.value},});
  }
});
