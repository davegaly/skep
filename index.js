require("dotenv").config();
const Koa = require('koa');
const router = require('@koa/router')();
const logger = require('koa-logger');

const Logger = require('./helpers/logger');


// --------------------


Logger.log("App is starting...");
const app = new Koa();


// env File Check
Logger.log("Checking mandatory .env settings");
const settingsServerENV = process.env["SERVER_ENV"];
Logger.log("SERVER_ENV: " + settingsServerENV);
if (settingsServerENV == undefined) {
  Logger.error("Could not retrieve SERVER_END in .env file. Shutting down...");
  return;
}
if (settingsServerENV != "dev" && settingsServerENV != "prod") {
  Logger.error("SERVER_ENV must be 'dev' or 'prod'. Shutting down...");
  return;
}
const settingsAppKeyENV = process.env["APP_KEY"];
Logger.log("APP_KEY: " + settingsAppKeyENV);
if (settingsAppKeyENV == undefined || settingsAppKeyENV == null || settingsAppKeyENV == '') {
  Logger.error("Could not retrieve APP_KEY in .env file. Shutting down...");
  return;
}


// middlewares here
app.use(logger());


// adding routes
let basicRouting = require("./helpers/routing.js");
app.use(basicRouting.routes());


// all good
Logger.log("App was started correctly");


// test area
//const aaa = require('./apps/testapp/db/providers/departmentsProvider');
//aaa.getIdByGuid("8861f886-dff1-4faa-af14-937eefa820a4");
//aaa.listAll();


app.listen(3000);
