class ApiManager {

  // builds a API response object
  static BuildAPIResponse(success, responseData, errorMessage) {
    let result = {};
    result.success = true;
    result.data = responseData;
    result.errorMessage = errorMessage;
    return result;
  } 

}

module.exports = ApiManager;  