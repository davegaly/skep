
// returns the path to the database file, according to the SERVER_ENV and APP_KEY in the .env file
function ReturnDBPath() {
    
    const serverENV = process.env['SERVER_ENV'];
    const appKey = process.env['APP_KEY'];

    if (serverENV == 'dev') {
        return "./apps/" + appKey + "db/dev.sqlite";
    }

    if (serverENV == 'prod') {
        return "./apps/" + appKey + "db/prod.sqlite";
    }
}

// adds column system fields
function AddSystemFields(createTableObject) {

    createTableObject.guid = 'uuid';
    createTableObject.isDeleted = 'int';
    createTableObject.createdDate = 'string';
    createTableObject.createdBy = 'string';
    createTableObject.modifiedDate = 'string';
    createTableObject.modifiedBy = 'string';

    return createTableObject;
}

module.exports = {ReturnDBPath, AddSystemFields};