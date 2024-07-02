
class PagesContentManager {

  FromPageConfigToContent(pageContent) {

    let htmlContent = '';

    // iterate all lines of the content
    pageContent.split('\n').forEach(line => {
      let currentLineContent = line.trim();
      console.log(currentLineContent);
      switch(currentLineContent) {
        case 'row': htmlContent += this.RenderGridRow(); break;
        case 'col-6': htmlContent += this.RenderGridCol(); break;
        case '/': htmlContent += this.RenderCloseDiv(); break;
        default: htmlContent += currentLineContent; break;
      }

    });

    return htmlContent;
  }

  RenderGridCol() {
    return "<div class='col-md-6'>";
  }
  RenderGridRow() {
    return "<div class='row'>";
  }
  RenderCloseDiv() {
    return "</div>";
  }

}
  
module.exports = PagesContentManager;  