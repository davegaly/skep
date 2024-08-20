let usersList = {};

document.addEventListener('DOMContentLoaded', async function() {

    // loads the datagrid
    const apiResult = await skepUICallAPIAndWait('../api/users/listForGrid');
    if (apiResult.success) {
        usersList = apiResult.data;
        skepUITableDataBind("tblUsers", usersList);
    }

    // task repeater
    const rptTasks = document.getElementById('rptTasks');
    usersList.forEach(item => {
        const renderedItem = itemTemplate
          .replace('{{guid}}', item.guid)
          .replace('{{name}}', item.displayName);
          rptTasks.innerHTML += renderedItem;
    });

});

function tblUsersOnEditClick(fieldValue) {
    skepUIGoToPage("usersEdit?guid=" + fieldValue);
}

function btnCreateOnClick() {
    skepUIGoToPage("usersEdit");
}

const itemTemplate = `
  <div class="item">
    <h3>{{guid}}</h3>
    <p>{{name}}</p>
  </div>
`;