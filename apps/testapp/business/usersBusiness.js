/*const apiManager  = require('../../../helpers/apiManager');

// input validation
function saveAdjustInputCtx(ctx) {

    let result = {};
    result.isClientInputValid = apiManager.BuildClientInputValidResponse(); // default valid

    // checks fields validation
    if (apiManager.CheckInputNotEmpty(ctx.request.body.name) == false) {
        result = apiManager.BuildClientInputInvalidResponse("Department name cannot be empty", "txtName");
        return result;
    }
    if (apiManager.CheckInputNotEmpty(ctx.request.body.altroCampo) == false) {
        result = apiManager.BuildClientInputInvalidResponse("Altro Campo name cannot be empty", "txtAltroCampo");
        return result;
    }

    return result;
}

module.exports = { saveAdjustInputCtx }
*/