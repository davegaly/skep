
class PagesContentManager {

  FromPageConfigToContent(pageContent) {

    let htmlContent = '';

    // iterate all lines of the content
    pageContent.split('\n').forEach(line => {
      let currentLineContent = line.trim();   
      
      if (currentLineContent == 'row') { htmlContent += this.RenderGridRow(); }
      else if (currentLineContent == 'col-6') { htmlContent += this.RenderGridCol(6); }
      else if (currentLineContent == 'col-12') { htmlContent += this.RenderGridCol(12); }
      else if (currentLineContent == '/') { htmlContent += this.RenderCloseDiv(); }
      else if (currentLineContent.startsWith('txt')) { htmlContent += this.RenderTextbox(currentLineContent); }
      else if (currentLineContent.startsWith('btn')) { htmlContent += this.RenderButton(currentLineContent); }
      else { htmlContent += currentLineContent; }

    });

    return htmlContent;
  }

  RenderGridCol(width) {
    return "<div class='col-md-" + width + "'>";
  }
  RenderGridRow() {
    return "<div class='row'>";
  }

  RenderTextbox(currentLineContent) {
    // txt-username-labelText
    const label = currentLineContent.split('-')[2];
    const id = currentLineContent.split('-')[1];
    let lbl = "<label id='lbl" + this.CapitalizeFirstLetter(id) + "'>" + label + "</label>";
    let txt = "<input type='text' id='txt" + this.CapitalizeFirstLetter(id) + "' class='form-control' />";
    return lbl + txt;
  }  

  RenderButton(currentLineContent) {
    // btn-save-buttonText
    const buttonText = currentLineContent.split('-')[2];
    const id = currentLineContent.split('-')[1];
    const fullId = 'btn' + this.CapitalizeFirstLetter(id);
    let btn = "<button id='" + fullId + "' onclick='" + fullId + "OnClick();' class='btn btn-primary'>" + buttonText + "</button>";
    return btn;
  }    

  RenderCloseDiv() {
    return "</div>";
  }

  CapitalizeFirstLetter(str) {
    if (!str) return str;  // Check for empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
  
module.exports = PagesContentManager;  