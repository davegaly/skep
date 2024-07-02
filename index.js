const Koa = require('koa');
const router = require('@koa/router')();
const fs = require('fs').promises;
const path = require('path');

const Logger = require('./logger'); // Import the custom logger

Logger.log("App is starting...");
const app = new Koa();
Logger.log("App was started");

// Route handler
router.get('/apps/testapp/pages/:txtfilename', async (ctx) => {
  
  Logger.log("Routed correctly for Skep");

  try {
    const txtFilename = ctx.params.txtfilename;

    console.log(`[${new Date().toISOString()}] ` + txtFilename);

    const filePath = path.join(__dirname, 'apps', 'testapp', 'pages', `${txtFilename}.txt`);
    
    // Read the contents of the file
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Parse the content to extract page_title
    const lines = fileContent.trim().split('\n');
    const pageDetails = {};
    lines.forEach(line => {
      const [key, value] = line.split(':');
      pageDetails[key.trim()] = value.trim();
    });

    // Create HTML response
    const htmlResponse = `
      <html>
        <head>
          <title>${pageDetails['page_title']}</title>
        </head>
        <body>
          <h1>${pageDetails['page_title']}</h1>
          <p>Menu text: ${pageDetails['menu_text']}</p>
        </body>
      </html>
    `;
    
    ctx.type = 'text/html';
    ctx.body = htmlResponse;
  } catch (err) {
    // Handle errors, e.g., file not found
    console.log(`[${new Date().toISOString()}] Error ` + err);
    ctx.status = 404;
    ctx.body = 'Page not found';
  }
});

app.use(router.routes());

app.listen(3000);
