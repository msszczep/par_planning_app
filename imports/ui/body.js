import { Template } from 'meteor/templating';
import { Games } from '../api/games.js';
import { Usermetadata } from '../api/usermetadata.js';
import { Neighborhoods } from '../api/neighborhoods.js';
import { Workplaces } from '../api/workplaces.js';

import './body.html';

Template.itemsList.helpers({

  neighborhoodsToShow() {
    return Neighborhoods.find({});
  },

  workplacesToShow() {
    return Workplaces.find({});
  },

  userMetadata() {
    u = Usermetadata.find({userId: Accounts.user()._id}).fetch({})[0];
    w = Workplaces.find({_id: u.workplace}).fetch({})[0];
    n = Neighborhoods.find({_id: u.neighborhood}).fetch({})[0];
    return {_id: u._id, workplace: w.name, neighborhood: n.name}
  }

});

Template.body.events({

  'click .joinneighborhood' (event) {
    event.preventDefault();
    const target = event.target;
    Usermetadata.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, neighborhood: target.value},}, {upsert: true});
  },

  'click .joinworkplace' (event) {
    event.preventDefault();
    const target = event.target;
    Usermetadata.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, workplace: target.value},}, {upsert: true});
  }

});
