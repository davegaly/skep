let querystringParamGuid = null;
let currentDepartment = null;

// load
document.addEventListener('DOMContentLoaded', function() {

    // read querystring params
    querystringParamGuid = skepUIGetQueryStringParameter('guid');

    if (querystringParamGuid != null) {
        loadDepartment();
    }
});

// loads an existing item from the server using its guid
function loadDepartment() {
    // Step 2: Fetch data from the local API
    fetch('../api/departments/getByGuid/' + querystringParamGuid) // Replace with your local API URL
    .then(response => {
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        currentDepartment = data;
        document.getElementById('txtName').value = currentDepartment.name;
    });
}

// save a item
function saveDepartment() {
    
    let objectToPost = {};
    objectToPost.id = currentDepartment.id;
    objectToPost.guid = querystringParamGuid;
    objectToPost.name = document.getElementById('txtName').value;

    console.log(JSON.stringify(objectToPost));

    fetch('../api/departments/save', { method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(objectToPost)})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        
    });
}

// saves
function btnSaveOnClick() {
    saveDepartment();
}

// goes to departments list
function btnGoBackOnClick() {
    skepUIGoToPage("departments");
}