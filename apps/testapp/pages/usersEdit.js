let querystringParamGuid = null;
let currentUser = null;

// load
document.addEventListener('DOMContentLoaded', function() {

    // read querystring params
    querystringParamGuid = skepUIGetQueryStringParameter('guid');

    // in case of edit, loads the record from the server
    if (querystringParamGuid != null) {
        loadUser();
    }
});

// loads an existing item from the server using its guid
async function loadUser() {
    const apiResult = await skepUICallAPIAndWait('../api/users/getByGuid/' + querystringParamGuid);
    if (apiResult.success) {
        currentUser = apiResult.data;
        document.getElementById('txtDisplayName').value = currentUser.displayName;
        document.getElementById('txtEmail').value = currentUser.email;
    }
}

// save a item
async function saveUser() {
    
    // clears validation
    skepUISetValidationMessage("txtDisplayName", "");
    skepUISetValidationMessage("txtEmail", "");

    let objectToPost = {};
    if (currentUser != null) objectToPost.id = currentUser.id;
    objectToPost.guid = querystringParamGuid;
    objectToPost.displayName = document.getElementById('txtDisplayName').value;
    objectToPost.email = document.getElementById('txtEmail').value;
    const apiResult = await skepUICallAPIAndWait('../api/users/save/', objectToPost);

    // check response
    if (apiResult.clientValidationData != null && apiResult.clientValidationData.isClientInputValid == false) {
        skepUISetValidationMessage(apiResult.clientValidationData.invalidFieldId, apiResult.clientValidationData.clientValidationError);
        return;
    }
    else
    {
        btnGoBackOnClick();
    }
}

// saves
function btnSaveOnClick() {
    saveUser();
}

// goes to departments list
function btnGoBackOnClick() {
    skepUIGoToPage("users");
}

// delete
function btnDeleteOnClick() {
    fetch('../api/users/deleteLogic/' + querystringParamGuid) // Replace with your local API URL
    .then(response => {
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        btnGoBackOnClick();
    });
}