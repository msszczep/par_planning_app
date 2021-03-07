import { Template } from 'meteor/templating';
import { Actors } from '../api/actors.js';
import { Councils } from '../api/councils.js';
import { IterationCounter } from '../api/iterationcounter.js';
import { IterationData } from '../api/iterationdata.js';
import { Prices } from '../api/prices.js';
import { Meteor } from 'meteor/meteor';

import './body.html';

Template.editpaneloggedin.helpers({

  chooseWcQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({userId: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({userId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0]; 
    return ((a === undefined) && (i === undefined));
  },

  chooseCcQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({userId: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({userId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0]; 
    return ((a != undefined) && (a.neighborhoodId === undefined) && (i === undefined));
  },

});

Template.chooseccpane.helpers({

  neighborhoodsToShow() {
    return Councils.find({type: "c"}).fetch({});
  }, 

});

Template.choosewcpane.helpers({

  workplacesToShow() {
    return Councils.find({type: "w"}).fetch({});
  }, 

});

Template.choosewcpane.events({

  'click .joinworkplace' (event) {
    event.preventDefault();
    const target = event.target.value.split("/");
    Actors.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, workplaceId: target[0], workplace: target[1]},}, {upsert: true});
  }

});

Template.chooseccpane.events({

  'click .joinneighborhood' (event) {
    event.preventDefault();
    const target = event.target.value.split("/");
    Actors.update(Accounts.user()._id, {$set: {userId: Accounts.user()._id, neighborhoodId: target[0], neighborhood: target[1]},}, {upsert: true});
  }

});

