import { Template } from 'meteor/templating';
import { Games } from '../api/games.js';

import './body.html';

Template.gamesList.helpers({
  gamesToShow() {
    return Games.find({});
  }
});

Template.body.events({
  'click .addgame' (event) {
    event.preventDefault();

    Games.insert({createdBy: Accounts.user()._id, createdAt: Date()});
  }
});
