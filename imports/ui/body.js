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

Template.viewpaneloggedin.helpers({

  currentIteration() {
    return IterationCounter.find({}).fetch({})[0].iteration;
  },

  workersInBakery() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({workplace: "Bakery", iteration: c}).fetch({});
  },

  workersInBrewery() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({workplace: "Brewery", iteration: c}).fetch({});
  },

  workersInPizzeria() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({workplace: "Pizzeria", iteration: c}).fetch({});
  },

  rockerhillmembers() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({neighborhood: "Rocker Hill", iteration: c}).fetch({});
  },

  goldmangreenmembers() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({neighborhood: "Goldman Green", iteration: c}).fetch({});
  },

  bakuninbaymembers() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    return IterationData.find({neighborhood: "Bakunin Bay", iteration: c}).fetch({});
  },

  currentPrices() {
    c = IterationCounter.find({}).fetch({})[0];
    p = Prices.find({iteration: c.iteration}).fetch({})[0];
    return {pizza: p.pizza.toFixed(2), beer: p.beer.toFixed(2), bread: p.bread.toFixed(2), labor: p.labor.toFixed(2), wheat: p.wheat.toFixed(2)};
  },

  supplyDemandData() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    iData = IterationData.find({iteration: c}).fetch({});
    totalpizzademand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.pizza);
    }, 0);
    totalbeerdemand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.beer);
    }, 0);
    totalbreaddemand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.bread);
    }, 0);

    const laborConvert = {"bread": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "beer": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "pizza": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    const wheatConvert = {"bread": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "beer": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "pizza": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    a = Actors.find({}).fetch({}).length;
    frequencyfunction = function (acc, iterationdatum) {
      if (acc[iterationdatum.recipe] === undefined) {
        acc[iterationdatum.recipe] = 1;
      } else {
        acc[iterationdatum.recipe] += 1;
      }
      return acc;
    };
    sortingfunction = function (a, b) { return a[1] + b[1] };
    pctdiff = function (a, b) { return Math.abs(a - b) * 100 / (a + b); }

    pizzadata = IterationData.find({iteration: c, workplace: "Pizzeria"}).fetch({});
    beerdata = IterationData.find({iteration: c, workplace: "Brewery"}).fetch({});
    breaddata = IterationData.find({iteration: c, workplace: "Bakery"}).fetch({});

    pizzahours = pizzadata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);
    breadhours = breaddata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);
    beerhours = beerdata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);

    pizzarecipes = pizzadata.reduce(frequencyfunction, {});
    breadrecipes = breaddata.reduce(frequencyfunction, {});
    beerrecipes = beerdata.reduce(frequencyfunction, {});

    pizzasortable = [];
    beersortable = [];
    breadsortable = [];

    for (i in pizzarecipes) {
      pizzasortable.push([i, pizzarecipes[i]])
    };
    for (i in breadrecipes) {
      breadsortable.push([i, breadrecipes[i]])
    };
    for (i in beerrecipes) {
      beersortable.push([i, beerrecipes[i]])
    };

    breadsortable.sort(sortingfunction);
    beersortable.sort(sortingfunction);
    pizzasortable.sort(sortingfunction);

    winningpizzarecipe = pizzasortable.length === 0 ? '' : pizzasortable[0][0];
    winningbreadrecipe = breadsortable.length === 0 ? '' : breadsortable[0][0];
    winningbeerrecipe = beersortable.length === 0 ? '' : beersortable[0][0];

    breadsupplyr = breadhours / laborConvert["bread"][winningbreadrecipe];
    pizzasupplyr = pizzahours / laborConvert["pizza"][winningpizzarecipe];
    beersupplyr = beerhours / laborConvert["beer"][winningbeerrecipe];
    totallaborsupply = breadhours + pizzahours + beerhours;
    totalwheatsupply = a * 12;

    pizzawheatdemand = (pizzasupplyr * wheatConvert["pizza"][winningpizzarecipe]);
    beerwheatdemand = (beersupplyr * wheatConvert["beer"][winningbeerrecipe]);
    breadwheatdemand = (breadsupplyr * wheatConvert["bread"][winningbreadrecipe]);
    wheatdemandr = pizzawheatdemand + beerwheatdemand + breadwheatdemand;

    pizzalabordemand = totalpizzademand * laborConvert["pizza"][winningpizzarecipe];
    breadlabordemand = totalbreaddemand * laborConvert["bread"][winningbreadrecipe];
    beerlabordemand = totalbeerdemand * laborConvert["beer"][winningbeerrecipe];
    totallabordemand = pizzalabordemand + breadlabordemand + beerlabordemand;

    p = Prices.find({iteration: c}).fetch({})[0];

    brewerysbr = beersupplyr * p.beer;
    bakerysbr = breadsupplyr * p.bread;
    pizzeriasbr = pizzasupplyr * p.pizza;

    pizzeriascr = (pizzahours * p.pizza) + (pizzawheatdemand * p.wheat);
    bakeryscr = (breadhours * p.bread) + (breadwheatdemand * p.wheat);
    breweryscr = (beerhours * p.beer) + (beerwheatdemand * p.wheat);

    bakeryratior = bakerysbr / bakeryscr;
    breweryratior = brewerysbr / breweryscr;
    pizzeriaratior = pizzeriasbr / pizzeriascr;

    bakerycss = bakeryratior <= 1 ? "redstyle" : "greenstyle";
    brewerycss = breweryratior <= 1 ? "redstyle" : "greenstyle";
    pizzeriacss = pizzeriaratior <= 1 ? "redstyle" : "greenstyle";

    rockerhilldata = IterationData.find({iteration: c, neighborhood: "Rocker Hill"}).fetch({});
    rockerhillcreditr = rockerhilldata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.hoursToWork) * 15);
    }, 0);
    rockerhilldebitr = rockerhilldata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.pizza) * p.pizza) + (Number(iterationdatum.bread) * p.bread) + (Number(iterationdatum.beer) * p.beer);
    }, 0);
    rockerhillsurplusr = rockerhillcreditr - rockerhilldebitr;
    rockerhillcss =  rockerhillsurplusr >= 0 ? "greenstyle" : "redstyle";

    goldmangreendata = IterationData.find({iteration: c, neighborhood: "Goldman Green"}).fetch({});
    goldmangreencreditr = goldmangreendata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.hoursToWork) * 15);
    }, 0);
    goldmangreendebitr = goldmangreendata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.pizza) * p.pizza) + (Number(iterationdatum.bread) * p.bread) + (Number(iterationdatum.beer) * p.beer);
    }, 0);
    goldmangreensurplusr = goldmangreencreditr - goldmangreendebitr;
    goldmangreencss =  goldmangreensurplusr >= 0 ? "greenstyle" : "redstyle";

    bakuninbaydata = IterationData.find({iteration: c, neighborhood: "Bakunin Bay"}).fetch({});
    bakuninbaycreditr = bakuninbaydata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.hoursToWork) * 15);
    }, 0);
    bakuninbaydebitr = bakuninbaydata.reduce(function (acc, iterationdatum) {
      return acc + (Number(iterationdatum.pizza) * p.pizza) + (Number(iterationdatum.bread) * p.bread) + (Number(iterationdatum.beer) * p.beer);
    }, 0);
    bakuninbaysurplusr = bakuninbaycreditr - bakuninbaydebitr;
    bakuninbaycss =  bakuninbaysurplusr >= 0 ? "greenstyle" : "redstyle";

    ispizzaenough = pizzasupplyr >= totalpizzademand;
    isbeerenough = beersupplyr >= totalbeerdemand;
    isbreadenough = beersupplyr >= totalbeerdemand;
    islaborenough = totallaborsupply >= totallabordemand;
    iswheatenough = totalwheatsupply >= wheatdemandr;

    return {laborsupply: totallaborsupply.toFixed(2), wheatsupply: totalwheatsupply.toFixed(2), breadsupply: breadsupplyr.toFixed(2), pizzasupply: pizzasupplyr.toFixed(2), beersupply: beersupplyr.toFixed(2), wheatdemand: wheatdemandr.toFixed(2), pizzademand: totalpizzademand.toFixed(2), beerdemand: totalbeerdemand.toFixed(2), breaddemand: totalbreaddemand.toFixed(2), pdpizza: pctdiff(pizzasupplyr, totalpizzademand).toFixed(2), pdbread: pctdiff(breadsupplyr, totalbreaddemand).toFixed(2), pdbeer: pctdiff(beersupplyr, totalbeerdemand).toFixed(2), pdwheat: pctdiff(totalwheatsupply, wheatdemandr).toFixed(2), pizzeriaSb: pizzeriasbr.toFixed(2), brewerySb: brewerysbr.toFixed(2), bakerySb: bakerysbr.toFixed(2), pizzeriaSc: pizzeriascr.toFixed(2), bakerySc: bakeryscr.toFixed(2), bakeryRatio: bakeryratior.toFixed(2), brewerySc: breweryscr.toFixed(2), breweryRatio: breweryratior.toFixed(2), pizzeriaRatio: pizzeriaratior.toFixed(2), bakerystyle: bakerycss, brewerystyle: brewerycss, pizzeriastyle: pizzeriacss, rockerhillcredit: rockerhillcreditr.toFixed(2), rockerhilldebt: rockerhilldebitr.toFixed(2), rockerhillsurplus: rockerhillsurplusr.toFixed(2), rockerhillstyle: rockerhillcss, bakuninbaycredit: bakuninbaycreditr.toFixed(2), bakuninbaydebt: bakuninbaydebitr.toFixed(2), bakuninbaysurplus: bakuninbaysurplusr.toFixed(2), bakuninbaystyle: bakuninbaycss, goldmangreencredit: goldmangreencreditr.toFixed(2), goldmangreendebt: goldmangreendebitr.toFixed(2), goldmangreensurplus: goldmangreensurplusr.toFixed(2), goldmangreenstyle: goldmangreencss, labordemand: totallabordemand.toFixed(2), pdlabor: pctdiff(totallaborsupply, totallabordemand).toFixed(2), enoughpizza: ispizzaenough, enoughbeer: isbeerenough, enoughbread: isbreadenough, enoughlabor: islaborenough, enoughwheat: iswheatenough};

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

Template.chooserecipepane.helpers({

  data() {
    const laborConvert = {"Bakery": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "Brewery": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "Pizzeria": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    const wheatConvert = {"Bakery": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "Brewery": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "Pizzeria": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    n = IterationCounter.find({}).fetch({})[0].iteration;
    i = IterationData.find({actorId: Accounts.user()._id, iteration: n}).fetch({})[0];
    cs = Number(i.hoursToWork) * 15;
    p = Prices.find({iteration: n}).fetch({})[0];
    supplyA = Number(i.hoursToWork) / laborConvert[i.workplace]["A"];
    supplyB = Number(i.hoursToWork) / laborConvert[i.workplace]["B"];
    supplyC = Number(i.hoursToWork) / laborConvert[i.workplace]["C"];
    console.log(supplyA);
    console.log(supplyB);
    console.log(supplyC);
    wheatDemandA = supplyA * wheatConvert[i.workplace]["A"];
    wheatDemandB = supplyB * wheatConvert[i.workplace]["B"];
    wheatDemandC = supplyC * wheatConvert[i.workplace]["C"];
    console.log(wheatDemandA);
    console.log(wheatDemandB);
    console.log(wheatDemandC);
    if (i.workplace == "Bakery") {
      priceToUse = p.bread;
    } else if (i.workplace == "Brewery") {
      priceToUse = p.beer;
    } else if (i.workplace == "Pizzeria") {
      priceToUse = p.pizza;
    }
    sbA = supplyA * priceToUse;
    sbB = supplyB * priceToUse;
    sbC = supplyC * priceToUse;
    console.log(sbA);
    console.log(sbB);
    console.log(sbC);
    scA = (Number(i.hoursToWork) * p.labor) + (wheatDemandA * priceToUse);
    scB = (Number(i.hoursToWork) * p.labor) + (wheatDemandB * priceToUse);
    scC = (Number(i.hoursToWork) * p.labor) + (wheatDemandC * priceToUse);
    console.log(scA);
    console.log(scB);
    console.log(scC);
    sbscA = sbA / scA;
    sbscB = sbB / scB;
    sbscC = sbC / scC;
    return {n: n, hoursToWork: i.hoursToWork, credits: cs, supplyA: supplyA.toFixed(2), supplyB: supplyB.toFixed(2), supplyC: supplyC.toFixed(2), ratioA: sbscA.toFixed(2), ratioB: sbscB.toFixed(2), ratioC: sbscC.toFixed(2)};
  }

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

  data() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c}).fetch({})[0];
    p = Prices.find({iteration: c}).fetch({})[0];
    cs = Number(i.hoursToWork) * 15;
    return {n: c, rangearray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], credits: cs, hoursToWork: i.hoursToWork, pizzaprice: p.pizza.toFixed(2)};
  },

});

Template.choosebeerpane.helpers({

  data() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c}).fetch({})[0];
    p = Prices.find({iteration: c}).fetch({})[0];
    cs = (Number(i.hoursToWork) * 15) - (Number(i.pizza) * p.pizza);
    return {n: c, rangearray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], credits: cs.toFixed(2), hoursToWork: i.hoursToWork, beerprice: p.beer.toFixed(2)};
  },

});

Template.choosebreadpane.helpers({

  data() {
    c = IterationCounter.find({}).fetch({})[0].iteration;
    i = IterationData.find({actorId: Accounts.user()._id, iteration: c}).fetch({})[0];
    p = Prices.find({iteration: c}).fetch({})[0];
    cs = (Number(i.hoursToWork) * 15) - (Number(i.pizza) * p.pizza) - (Number(i.beer) * p.beer);
    return {n: c, rangearray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], credits: cs.toFixed(2), hoursToWork: i.hoursToWork, breadprice: p.bread.toFixed(2)};
  },

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
    const a = Actors.find({_id: Accounts.user()._id}).fetch({})[0];
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const target = event.target.value;
    const email = Accounts.user().emails[0].address;
    IterationData.insert({actorId: Accounts.user()._id, iteration: n, hoursToWork: target, actorEmail: email, workplace: a.workplace, workplaceId: a.workplaceId, neighborhood: a.neighborhood, neighborhoodId: a.neighborhoodId});
  }

});

Template.chooserecipepane.events({

  'click .recipe' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const i = IterationData.find({actorId: Accounts.user()._id, iteration: n}).fetch({})[0];
    const target = event.target.value;
    IterationData.update(i._id, {$set: {recipe: target},});
  }

});

Template.choosepizzapane.events({

  'click .pizza' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const i = IterationData.find({actorId: Accounts.user()._id, iteration: n}).fetch({})[0];
    const target = event.target.value;
    IterationData.update(i._id, {$set: {pizza: target},});
  }

});

Template.choosebeerpane.events({

  'click .beer' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const i = IterationData.find({actorId: Accounts.user()._id, iteration: n}).fetch({})[0];
    const target = event.target.value;
    IterationData.update(i._id, {$set: {beer: target},});
  }

});

Template.choosebreadpane.events({

  'click .bread' (event) {
    event.preventDefault();
    const n = IterationCounter.find({}).fetch({})[0].iteration;
    const i = IterationData.find({actorId: Accounts.user()._id, iteration: n}).fetch({})[0];
    const target = event.target.value;
    IterationData.update(i._id, {$set: {bread: target},});
  }

});

Template.resetpane.events({

  'click .newiteration' (event) {
    event.preventDefault();
    ic = IterationCounter.find({}).fetch({})[0];
    c = ic.iteration;

    newpricefunction = function (supply, demand, price) {
      surplus = supply - demand;
      v = (Math.abs(2 * surplus) / (demand + supply));
      w = v * (1.05 - Math.pow(0.5, v));
      if (surplus > 0) {
        newprice = (1 - w) * price * 1000 / 1000;
      } else if (surplus < 0) {
        newprice = (1 + w) * price * 1000 / 1000;
      } else {
        newprice = price * 1000 / 1000;
      }
      return newprice;
    };

    iData = IterationData.find({iteration: c}).fetch({});
    totalpizzademand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.pizza);
    }, 0);
    totalbeerdemand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.beer);
    }, 0);
    totalbreaddemand = iData.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.bread);
    }, 0);

    const laborConvert = {"bread": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "beer": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "pizza": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    const wheatConvert = {"bread": {"A": 1.25, "B": 1, "C": 0.75, "": 1},
                          "beer": {"A": 1.75, "B": 1, "C": 0.25, "": 1},
                          "pizza": {"A": 1.5, "B": 1, "C": 0.5, "": 1}};
    a = Actors.find({}).fetch({}).length;
    frequencyfunction = function (acc, iterationdatum) {
      if (acc[iterationdatum.recipe] === undefined) {
        acc[iterationdatum.recipe] = 1;
      } else {
        acc[iterationdatum.recipe] += 1;
      }
      return acc;
    };
    sortingfunction = function (a, b) { return a[1] + b[1] };
    pctdiff = function (a, b) { return Math.round(Math.abs(a - b) / ((a + b) / 2) * 100 * 1000) / 1000 }

    pizzadata = IterationData.find({iteration: c, workplace: "Pizzeria"}).fetch({});
    beerdata = IterationData.find({iteration: c, workplace: "Brewery"}).fetch({});
    breaddata = IterationData.find({iteration: c, workplace: "Bakery"}).fetch({});

    pizzahours = pizzadata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);
    breadhours = breaddata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);
    beerhours = beerdata.reduce(function (accumulator, iterationdatum) {
      return accumulator + Number(iterationdatum.hoursToWork);
    }, 0);

    pizzarecipes = pizzadata.reduce(frequencyfunction, {});
    breadrecipes = breaddata.reduce(frequencyfunction, {});
    beerrecipes = beerdata.reduce(frequencyfunction, {});

    pizzasortable = [];
    beersortable = [];
    breadsortable = [];

    for (i in pizzarecipes) {
      pizzasortable.push([i, pizzarecipes[i]])
    };
    for (i in breadrecipes) {
      breadsortable.push([i, breadrecipes[i]])
    };
    for (i in beerrecipes) {
      beersortable.push([i, beerrecipes[i]])
    };

    breadsortable.sort(sortingfunction);
    beersortable.sort(sortingfunction);
    pizzasortable.sort(sortingfunction);

    winningpizzarecipe = pizzasortable.length === 0 ? '' : pizzasortable[0][0];
    winningbreadrecipe = breadsortable.length === 0 ? '' : breadsortable[0][0];
    winningbeerrecipe = beersortable.length === 0 ? '' : beersortable[0][0];

    breadsupplyr = breadhours / laborConvert["bread"][winningbreadrecipe];
    pizzasupplyr = pizzahours / laborConvert["pizza"][winningpizzarecipe];
    beersupplyr = beerhours / laborConvert["beer"][winningbeerrecipe];
    totallaborsupply = breadhours + pizzahours + beerhours;
    totalwheatsupply = a * 12;

    pizzawheatdemand = (pizzasupplyr * wheatConvert["pizza"][winningpizzarecipe]);
    beerwheatdemand = (beersupplyr * wheatConvert["beer"][winningbeerrecipe]);
    breadwheatdemand = (breadsupplyr * wheatConvert["bread"][winningbreadrecipe]);
    wheatdemandr = pizzawheatdemand + beerwheatdemand + breadwheatdemand;

    p = Prices.find({iteration: c}).fetch({})[0];

    newpizzaprice = newpricefunction(pizzasupplyr, totalpizzademand, p.pizza);
    newbreadprice = newpricefunction(breadsupplyr, totalbreaddemand, p.bread);
    newbeerprice = newpricefunction(beersupplyr, totalbeerdemand, p.beer);
    newwheatprice = newpricefunction(totalwheatsupply, wheatdemandr, p.wheat);

    const newincrement = c + 1;
    IterationCounter.update(ic._id, {$set: {iteration: newincrement}});

    Prices.insert({iteration: newincrement, pizza: newpizzaprice, beer: newbeerprice, bread: newbreadprice, wheat: newwheatprice, labor: p.labor});
  }

});
