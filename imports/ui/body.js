import { Template } from 'meteor/templating';
import { Games } from '../api/games.js';
import { Usermetadata } from '../api/usermetadata.js';
import { Neighborhoods } from '../api/neighborhoods.js';
import { Workplaces } from '../api/workplaces.js';
import { IterationMetadata } from '../api/iterationmetadata.js';
import { Meteor } from 'meteor/meteor';

import './body.html';

Template.editpaneloggedin.helpers({

  neighborhoodsToShow() {
    return Neighborhoods.find({});
  },

  userMetadata() {
    u = Usermetadata.find({userId: Accounts.user()._id}).fetch({})[0];
    w = Workplaces.find({_id: u.workplace}).fetch({})[0];
    n = Neighborhoods.find({_id: u.neighborhood}).fetch({})[0];
    return {_id: u._id, workplace: w.name, neighborhood: n.name}
  },

  needsWorkplace() {
    u = Usermetadata.find({userId: Accounts.user()._id}).fetch({})[0];
    if ((u === undefined) || (u != undefined && u.workplace === undefined)) {
      return true;
    } else {
      return u.workplace === '';
    }
  }, 

  needsNeighborhood() {
    u = Usermetadata.find({userId: Accounts.user()._id}).fetch({})[0];
    if ((u === undefined) || (u != undefined && u.neighborhood === undefined)) {
      return true;
    } else {
      return u.neighborhood === '';
    }
  },

  hasWorkplaceAndNeighborhood() {
    u = Usermetadata.find({userId: Accounts.user()._id}).fetch({})[0];
    if (u.workplace != undefined && u.neighborhood != undefined) {
      return true;
    } else {
      return false;
    }
  }

});

Template.joinworkplacepane.helpers({

  workplacesToShow() {
    return Workplaces.find({});
  },

});

Template.joinneighborhoodpane.helpers({

  neighborhoodsToShow() {
    return Neighborhoods.find({});
  },

});

Template.viewpaneloggedin.helpers({

  workersToShow() {
    w = Workplaces.find({}).fetch({});
    m = Usermetadata.find({}).fetch({});
    a = [];
    for (let i = 0; i < w.length; i++) {
      b = [];
      for (let j = 0; j < m.length; j++) {
        if (w[i]._id === m[j].workplace) {
          b.push({email: Meteor.users.find({_id: m[j].userId}).fetch({})[0].emails[0].address});
        }
      }
      a.push({workplace: w[i].name, workers: b});
    }
    return a;
  },

  neighborsToShow() {
    n = Neighborhoods.find({}).fetch({});
    m = Usermetadata.find({}).fetch({});
    a = [];
    for (let i = 0; i < n.length; i++) {
      b = [];
      for (let j = 0; j < m.length; j++) {
        if (n[i]._id === m[j].neighborhood) {
          b.push({email: Meteor.users.find({_id: m[j].userId}).fetch({})[0].emails[0].address});
        }
      }
      a.push({neighborhood: n[i].name, neighbors: b});
    }
    return a;
  }

});

Template.joinworkplacepane.events({

  'click .joinworkplace' (event) {
    event.preventDefault();
    const target = event.target;
    Usermetadata.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, workplace: target.value},}, {upsert: true});
  }

});

Template.joinneighborhoodpane.events({

  'click .joinneighborhood' (event) {
    event.preventDefault();
    const target = event.target;
    Usermetadata.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, neighborhood: target.value},}, {upsert: true});
  },

});

Template.submititerationdatapane.events({

  'submit form' (event) {
// get current iteration

    event.preventDefault();
    htw = event.target.hoursToWork.value;
    recipeToUse = event.target.recipe.value;
    IterationMetadata.update(Accounts.user()._id, {$set: {iteration: 1, userId: Accounts.user()._id, hoursToWork: htw, recipe: recipeToUse},}, {upsert: true});

  },

});
