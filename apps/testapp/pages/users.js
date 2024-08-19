let usersList = {};

document.addEventListener('DOMContentLoaded', async function() {

    // loads the datagrid
    const apiResult = await skepUICallAPIAndWait('../api/users/listForGrid');
    if (apiResult.success) {
        usersList = apiResult.data;
        skepUITableDataBind("tblUsers", usersList);
    }

});

function tblUsersOnEditClick(fieldValue) {
    skepUIGoToPage("usersEdit?guid=" + fieldValue);
}

function btnCreateOnClick() {
    skepUIGoToPage("usersEdit");
}