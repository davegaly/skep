const fs = require('fs').promises;
const path = require('path');

class PagesManager {

  // retrieves the .txt config files by app key and page key
  async GetPageConfigByAppKeyAndPageKey(appKey, pageKey) {
    const filePath = path.join(__dirname, '../apps', appKey, 'pages', pageKey + '.config');
    const fileContent = await fs.readFile(filePath, 'utf8');    
    return this.ParseConfigFileContent(fileContent);
  }  

  // parses the config file content into an object
  ParseConfigFileContent(fileContent) {
    const lines = fileContent.split('\n');
    let pageTitle = '';
    let menuText = '';
    let content = '';
    let isContentSection = false;
    
    lines.forEach(line => {
      if (line.startsWith('pageTitle:')) {pageTitle = line.replace('pageTitle:', '').trim();} 
      else if (line.startsWith('menuText:')) {menuText = line.replace('menuText:', '').trim();} 
      else if (line.startsWith('content:')) {isContentSection = true;} 
      else if (isContentSection) {content += line.replace('[[[','').replace(']]]','') + '\n';}
    });
    content = content.trim();

    return {
      pageTitle,
      menuText,
      content
    };
  }

}
  
module.exports = PagesManager;  