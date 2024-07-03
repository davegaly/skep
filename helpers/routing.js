const Router = require('@koa/router');
const fs = require('fs').promises;
const path = require('path');

const Logger = require('./logger'); // import the custom logger
const PagesManager = require('./pagesManager'); // import the pages Manager
const PagesContentManager = require('./pagesContentManager'); // import the pages Manager

const stackblitzServerUrl = "https://skep-dtfm--3000--70dbe416.local-credentialless.webcontainer.io/";

const basicRouting = new Router();

basicRouting.get('/apps/:appKey/pagesjs/:pageKey', async (ctx) => {

  const appKey = ctx.params.appKey;
  const pageKey = ctx.params.pageKey;
  Logger.log("Routed correctly for Skep Page js");  
  const filePath = path.join(__dirname, '/../apps', appKey, 'pages', pageKey + '.js');
  const fileContent = await fs.readFile(filePath, 'utf8');    
  ctx.type = 'text/js';
  ctx.body = fileContent;
  return fileContent;

});

basicRouting.get('/apps/:appKey/pages/:pageKey', async (ctx) => {

  Logger.log("Routed correctly for Skep Page");

  try {

    // reading from url querystring
    const appKey = ctx.params.appKey;
    const pageKey = ctx.params.pageKey;
    const host = ctx.host;
    const url = ctx.url;
    Logger.log("Routed for appKey: " + appKey + ", " + pageKey + " pageKey");
    
    // read the contents of the file
    const pagesManager = new PagesManager();
    const pageConfig = await pagesManager.GetPageConfigByAppKeyAndPageKey(appKey, pageKey);

    let skeletonContent = await pagesManager.GetSkeleton(appKey, pageConfig.skeleton);

    const pagesContentManager = new PagesContentManager();
    const renderedContentHtml = pagesContentManager.FromPageConfigToContent(pageConfig.content);

    skeletonContent = skeletonContent.replace('[[[content]]]', renderedContentHtml);
    skeletonContent = skeletonContent.replace('[[[page_script_js_src]]]', stackblitzServerUrl + "apps/" + appKey + "/pagesjs/" + pageKey)

    ctx.type = 'text/html';
    ctx.body = skeletonContent;
    
  } catch (err) {
    // Handle errors, e.g., file not found
    console.log(`[${new Date().toISOString()}] Error ` + err);
    ctx.status = 404;
    ctx.body = 'Page not found';
  }
});

module.exports = basicRouting;  