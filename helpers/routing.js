const Router = require('@koa/router');
const fs = require('fs').promises;
const path = require('path');

const Logger = require('./logger'); // import the custom logger
const PagesManager = require('./pagesManager'); // import the pages Manager
const PagesContentManager = require('./pagesContentManager'); // import the pages Manager

const basicRouting = new Router();

// this route serves the .js file specific for a page:
// example: https://.../apps/testapp/pagesjs/usersEdit
basicRouting.get('/pagesjs/:pageKey', async (ctx) => {

  Logger.log("Routed correctly for Skep Page js");  

  const appKey = process.env["APP_KEY"];
  const pageKey = ctx.params.pageKey;

  if (pageKey == "shareduiclientfunctions") {
    // he called for the shared functions file
    try {
      const filePath = path.join(__dirname, '/../apps/_shared/uiClientFunctions.js');
      await fs.access(filePath, fs.constants.F_OK);
      const fileContent = await fs.readFile(filePath, 'utf8');    
      ctx.type = 'text/javascript';
      ctx.body = fileContent;
    } catch (error) {
      ctx.status = 404;
      ctx.body = '';
      Logger.error("Shared js functions not found for " + path.join(__dirname, '/../apps/_shared/uiclientfunctions.js'));  
    }
  }
  else
  {
    // he called for a specific .js for a page
    try {
      const filePath = path.join(__dirname, '/../apps', appKey, 'pages', pageKey + '.js');
      await fs.access(filePath, fs.constants.F_OK);
      const fileContent = await fs.readFile(filePath, 'utf8');    
      ctx.type = 'text/javascript';
      ctx.body = fileContent;
    } catch (error) {
      ctx.status = 404;
      ctx.body = '';
      Logger.error("Page js not found for " + path.join(__dirname, '/../apps', appKey, 'pages', pageKey + '.js'));  
    }
  }

});

// this route serves the specific page itself
// example: https://.../apps/testapp/pages/usersEdit
basicRouting.get('/pages/:pageKey', async (ctx) => {

  Logger.log("Routed correctly for Skep Page");

  try {

    // reading from url querystring
    const appKey = process.env["APP_KEY"];
    const pageKey = ctx.params.pageKey;
    Logger.log("Routed for appKey: " + appKey + ", " + pageKey + " pageKey");
    
    // read the page configuration from the .config file
    const pagesManager = new PagesManager();
    const pageConfig = await pagesManager.GetPageConfigByAppKeyAndPageKey(pageKey);
    Logger.log("Page config read succesfully");

    // gets the scheleton, according to the config
    let skeletonContent = await pagesManager.GetSkeleton(pageConfig.skeleton);

    // transform the configuration into html content
    const pagesContentManager = new PagesContentManager();
    const renderedContentHtml = pagesContentManager.FromPageConfigToContent(pageConfig.content);
    skeletonContent = skeletonContent.replace('[[[content]]]', renderedContentHtml);

    // manages the link to the specific page js file
    const stackBlitzBaseURL = process.env["STACKBLITZ_BASE_URL"];
    skeletonContent = skeletonContent.replace('[[[page_script_js_src]]]', stackBlitzBaseURL + "pagesjs/" + pageKey)
    skeletonContent = skeletonContent.replace('[[[client_functions_js_src]]]', stackBlitzBaseURL + "pagesjs/shareduiclientfunctions")

    ctx.type = 'text/html';
    ctx.body = skeletonContent;
    
  } catch (err) {
    // Handle errors, e.g., file not found
    Logger.error(err);
    ctx.status = 404;
    ctx.body = 'Page not found';
  }
});

// this route serves the apps/shared/uiclientfunctions.js file 
basicRouting.get('/shareduiclientfunctions', async (ctx) => {

  const appKey = process.env["APP_KEY"];

  try {
    const filePath = path.join(__dirname, '/../apps/_shared/uiclientfunctions.js');
    await fs.access(filePath, fs.constants.F_OK);
    const fileContent = await fs.readFile(filePath, 'utf8');    
    ctx.type = 'text/javascript';
    ctx.body = fileContent;
  } catch (error) {
    ctx.status = 404;
    ctx.body = '';
    Logger.error("Shared js functions not found for " + path.join(__dirname, '/../apps/_shared/uiclientfunctions.js'));  
  }

});

module.exports = basicRouting;  