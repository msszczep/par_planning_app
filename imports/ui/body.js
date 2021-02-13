import { Template } from 'meteor/templating';
import { Games } from '../api/games.js';
import { CurrentState } from '../api/currentstate.js';

import './body.html';

Template.gamesList.helpers({
  gamesToShow() {
    return Games.find({});
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

  'click .joingame' (event) {
    event.preventDefault();
    c = CurrentState.find({}).fetch({})[0];
    const target = event.target;

    CurrentState.update(c._id, {$set: {currentGame: target.value},});
  }
});
