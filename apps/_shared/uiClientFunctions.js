// navigates to a new page
function skepUIGoToPage(pageKey) {
    window.location.href = window.location.origin + '/pages/' + pageKey;
}

// read query string parameters, values after "?" in the url
function skepUIGetQueryStringParameter(parameterKey) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterKey);
}

// richiama una api e aspetta il risultato
async function skepUICallAPI(url, bodyToPost) {
    try {
        let response = null;
        if (bodyToPost == null) {
            // get
            response = await fetch(url); 
        }
        else
        {
            // post
            response = await fetch(url, {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(bodyToPost)}); 
        }
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON from the response
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
function skepUICallAPIAndWait(url, bodyToPost) {
    return skepUICallAPI(url, bodyToPost); // Always return a promise that can be awaited
}

// shows or clear a validation message
function skepUISetValidationMessage(mainControlId, validationMessage) {
    const validationPanel = document.getElementById(mainControlId + "ValidationPanel");
    if (!validationPanel) return; // if the control doesnt exist, just exit
    if (validationMessage != null && validationMessage != undefined && validationMessage != "" )
    {
        validationPanel.innerHTML = validationMessage;
        validationPanel.classList.remove("d-none");
        validationPanel.classList.add("d-block");
    }
    else
    {
        validationPanel.innerHTML = "";
        validationPanel.classList.remove("d-block");
        validationPanel.classList.add("d-none");
    }

}

// attaches a list of objects (datasource) to a skep <table>
function skepUITableDataBind(tableId, datasource) {
    // Select the table by its ID
    const table = document.getElementById(tableId);
    if (!table) return; // If table doesn't exist, exit the function
    // Get the <thead> element and its <th> elements
    const thElements = table.querySelectorAll('thead th');
    // Select the <tbody> where we'll insert rows
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ""; // Clear any existing rows
    // Iterate over the datasource (array of objects)
    datasource.forEach(dataItem => {
        // Create a new row
        let rowHtml = "<tr>";
        // Iterate over each <th> element
        thElements.forEach(th => {
            // Get the data-field attribute from the <th>
            const field = th.getAttribute('data-field');
            const fieldKey = th.getAttribute('data-key');
            // Get the corresponding value from the dataItem
            let cellValue = dataItem[field] !== undefined ? dataItem[field] : '';
            // special columns: key=edit
            if (fieldKey == "edit") { 
                editFunctionName = tableId + "OnEditClick";
                cellValue = '<span onclick="' + editFunctionName + '(\'' + dataItem[field] + '\')">modifica</span>'; 
            }
            // Append the value as a new <td>
            rowHtml += `<td>${cellValue}</td>`;
        });
        rowHtml += "</tr>";
        // Append the row to the <tbody>
        tbody.innerHTML += rowHtml;
    });

}