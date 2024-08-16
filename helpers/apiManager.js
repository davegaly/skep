class ApiManager {

  // builds a API response object
  static BuildAPIResponse(success, responseData, errorMessage, clientValidationData) {
    let result = {};
    result.success = true;
    result.data = responseData;
    result.errorMessage = errorMessage;
    result.clientValidationData = clientValidationData;
    return result;
  } 

  // in the update APIs, this is the result validation in case of invalid, to send back to client
  static BuildClientInputValidResponse() {
    let result = {};
    result.isClientInputValid = true;
    result.clientValidationError = null;
    return result;
  }   
  static BuildClientInputInvalidResponse(clientNotValidMessageUI) {
    let result = {};
    result.isClientInputValid = false;
    result.clientValidationError = clientNotValidMessageUI;
    return result;
  } 

  // check input params for the save api
  static CheckInputNotEmpty(inputValue) {
    if (inputValue !== null && inputValue !== undefined && inputValue !== '') {
      return true;
    }
    else
    {
      return false;
    }
  }

}

module.exports = ApiManager;  