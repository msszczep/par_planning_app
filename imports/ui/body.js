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
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0]; 
    return ((a === undefined) && (i === undefined));
  },

  chooseCcQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0]; 
    return ((a != undefined) && (a.neighborhoodId === undefined) && (i === undefined));
  },

  chooseHoursQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0]; 
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i === undefined));
  },

  chooseRecipeQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i != undefined) && (i.recipe === undefined));
  },

  choosePizzaQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i != undefined) && (i.recipe != undefined) && (i.pizza === undefined));
  },

  chooseBeerQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i != undefined) && (i.recipe != undefined) && (i.pizza != undefined) && (i.beer === undefined));
  },

  chooseBreadQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i != undefined) && (i.recipe != undefined) && (i.pizza != undefined) && (i.beer != undefined) && (i.bread === undefined));
  },

  iterationStatusQ() {
    c = IterationCounter.find({}).fetch({})[0];
    a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
    return ((a != undefined) && (a.neighborhoodId != undefined) && (i != undefined) && (i.recipe != undefined) && (i.pizza != undefined) && (i.beer != undefined) && (i.bread != undefined));
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

Template.choosehourspane.helpers({

  rangearray() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  n() {
    return IterationCounter.find({}).fetch({})[0].iteration;
  }

});

Template.choosepizzapane.helpers({

  rangearray() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  n() {
    return IterationCounter.find({}).fetch({})[0].iteration;
  }

});

Template.choosebeerpane.helpers({

  rangearray() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  n() {
    return IterationCounter.find({}).fetch({})[0].iteration;
  }

});

Template.choosebreadpane.helpers({

  rangearray() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  n() {
    return IterationCounter.find({}).fetch({})[0].iteration;
  }

});

Template.iterationstatuspane.helpers({

  iterationData() {
    c = IterationCounter.find({}).fetch({})[0];
    return IterationData.find({actorId: Accounts.user()._id, iteration: c.iteration}).fetch({})[0];
  },

  adminQ() {
    const email = Accounts.user().emails[0].address;
    return ((email === "mitchell@szcz.org") || (email === "mitchell@chicagomediaaction.org"));
  }

});

Template.choosewcpane.events({

  'click .joinworkplace' (event) {
    event.preventDefault();
    const email = Accounts.user().emails[0].address;
    const target = event.target.value.split("/");
    Actors.update(Accounts.user()._id, {$set: {actorEmail: email, workplaceId: target[0], workplace: target[1]},}, {upsert: true});
  }

});

Template.chooseccpane.events({

  'click .joinneighborhood' (event) {
    event.preventDefault();
    const target = event.target.value.split("/");
    Actors.update(Accounts.user()._id, {$set: {neighborhoodId: target[0], neighborhood: target[1]},}, {upsert: true});
  }

});

Template.choosehourspane.events({

  'click .hoursToWork' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const target = event.target.value;
    IterationData.update(Accounts.user()._id, {$set: {actorId: Accounts.user()._id, iteration: n, hoursToWork: target},}, {upsert: true});
  }

});

Template.chooserecipepane.events({

  'click .recipe' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const email = Accounts.user().emails[0].address;
    const target = event.target.value;
    IterationData.update(Accounts.user()._id, {$set: {actorId: Accounts.user()._id, actorEmail: email, iteration: n, recipe: target},}, {upsert: true});
  }

});

Template.choosepizzapane.events({

  'click .pizza' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const email = Accounts.user().emails[0].address;
    const target = event.target.value;
    IterationData.update(Accounts.user()._id, {$set: {actorId: Accounts.user()._id, actorEmail: email, iteration: n, pizza: target},}, {upsert: true});
  }

});

Template.choosebeerpane.events({

  'click .beer' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const email = Accounts.user().emails[0].address;
    const target = event.target.value;
    IterationData.update(Accounts.user()._id, {$set: {actorId: Accounts.user()._id, actorEmail: email, iteration: n, beer: target},}, {upsert: true});
  }

});

Template.choosebreadpane.events({

  'click .bread' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const email = Accounts.user().emails[0].address;
    const target = event.target.value;
    IterationData.update(Accounts.user()._id, {$set: {actorId: Accounts.user()._id, actorEmail: email, iteration: n, bread: target},}, {upsert: true});
  }

});

Template.resetpane.events({

  'click .newiteration' (event) {
    event.preventDefault();
    const i = IterationCounter.find({}).fetch({})[0];
    const newincrement = i.iteration + 1;
    console.log(i);
    IterationCounter.update(i._id, {$set: {iteration: newincrement}});
  }

});
