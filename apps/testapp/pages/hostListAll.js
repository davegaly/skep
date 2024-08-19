recordsList = {};

// load
document.addEventListener('DOMContentLoaded', function() {

});

async function btnShowUsersOnClick() {
    const apiResult = await skepUICallAPIAndWait('../api/users/listAll');
    if (apiResult.success) {
        recordsList = apiResult.data;
        skepUITableDataBind("tblUsers", recordsList);
    }
}

async function btnShowDepartmentsOnClick() {
    const apiResult = await skepUICallAPIAndWait('../api/departments/listAll');
    if (apiResult.success) {
        recordsList = apiResult.data;
        skepUITableDataBind("tblDepartments", recordsList);
    }
}
