import * as tpb_module from './tplanbuilder.mjs'
import * as fs from 'fs';


// const message_person = new Set(["child","mother","father"]);
// const person_filling = new Set(["full","partial"]);

//item = new cimodule.Combinatoritem(1,"child");
// var item = new cimodule.Combinatoritem('21312', 1 )
// let ci = initmodule.init();

var tplanConfig = JSON.parse(fs.readFileSync('./tplanconfig.1.json','utf-8'));
var tplanBuilder = new tpb_module.TPlanBuilder(tplanConfig)
var plan = tplanBuilder.buildplan();
plan = tplanBuilder.tabularize(plan);


console.table(plan);

