let querystringParamGuid = null;
let currentDepartment = null;

// load
document.addEventListener('DOMContentLoaded', function() {

    // read querystring params
    querystringParamGuid = skepUIGetQueryStringParameter('guid');

    // in case of edit, loads the record from the server
    if (querystringParamGuid != null) {
        loadDepartment();
    }

    // loads departments dd
    skepUIDropdownlistDataBindFromAPI("ddlDepartment");
});

// loads an existing item from the server using its guid
async function loadDepartment() {
    const apiResult = await skepUICallAPIAndWait('../api/departments/getByGuid/' + querystringParamGuid);
    if (apiResult.success) {
        currentDepartment = apiResult.data;
        document.getElementById('txtName').value = currentDepartment.name;
        document.getElementById('txtAltroCampo').value = currentDepartment.altroCampo;
    }
}

// save a item
async function saveDepartment() {
    
    // clears validation
    skepUISetValidationMessage("txtName", "");
    skepUISetValidationMessage("txtAltroCampo", "");

    let objectToPost = {};
    if (currentDepartment != null) objectToPost.id = currentDepartment.id;
    objectToPost.guid = querystringParamGuid;
    objectToPost.name = document.getElementById('txtName').value;
    objectToPost.altroCampo = document.getElementById('txtAltroCampo').value;
    const apiResult = await skepUICallAPIAndWait('../api/departments/save/', objectToPost);

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
    saveDepartment();
}

// goes to departments list
function btnGoBackOnClick() {
    skepUIGoToPage("departments");
}

// delete
function btnDeleteOnClick() {
    fetch('../api/departments/deleteLogic/' + querystringParamGuid) // Replace with your local API URL
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