let departmentsList = {};

document.addEventListener('DOMContentLoaded', async function() {

    // loads the datagrid
    const apiResult = await skepUICallAPIAndWait('../api/departments/listForGrid');
    if (apiResult.success) {
        departmentsList = apiResult.data;
        skepUITableDataBind("tblDepartments", departmentsList);

/*
        const table = document.createElement('table');
        table.style.width = '100%';
        table.setAttribute('border', '1');

        // Create the header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['GUID', 'Name']; // Column headers
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the body of the table
        const tbody = document.createElement('tbody');

        // Loop through the data and create rows for each item
        apiResult.data.forEach(item => {
            const row = document.createElement('tr');

            // Create a cell for the GUID
            const guidCell = document.createElement('td');
            guidCell.appendChild(document.createTextNode(item.guid));
            row.appendChild(guidCell);

            // Create a cell for the Name
            const nameCell = document.createElement('td');
            const span = document.createElement('span');
            span.textContent = item.name;
            span.style.cursor = 'pointer'; // Make the cursor a pointer to indicate clickability
            span.onclick = function() {
                skepUIGoToPage("departmentsEdit?guid=" + item.guid)
            };
            nameCell.appendChild(span);
            row.appendChild(nameCell);

            // Append the row to the table body
            tbody.appendChild(row);
        });

        // Append the body to the table
        table.appendChild(tbody);

        // Append the table to the DOM
        document.body.appendChild(table); // You can replace 'document.body' with any other element where you want the table to be placed
    */
    }

});

function tblDepartmentsOnEditClick(fieldValue) {
    skepUIGoToPage("departmentsEdit?guid=" + fieldValue);
}

function btnCreateOnClick() {
    skepUIGoToPage("departmentsEdit");
}