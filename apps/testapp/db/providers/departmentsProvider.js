//------------------------------------------------------
// THIS FILE IS AUTOGENERATED
// DO NOT APPLY MANUAL MODIFICATIONS IN THIS FILE!
//------------------------------------------------------

const sqlite3 = require("sqlite3").verbose();
const uuid = require('uuid');
const dbHelper = require('../../../../helpers/dbManager');

async function getIdByGuid(guid, callback) {
    console.log("departmentsProvider->getIdByGuid called with guid " + guid);
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = -1;
            db.get(`SELECT id FROM departments WHERE guid=? LIMIT 1`, [guid], (error, row) => {
                console.log("departmentsProvider->getIdByGuid returned row obj " + JSON.stringify(row));
                console.log("departmentsProvider->getIdByGuid sql Error:" + error);
                result = row.id;
                console.log("departmentsProvider->getIdByGuid this is the result: " + result);
                callback(null, result);
            });
        });
    });
}

async function getByGuid(params, callback) {
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = {};
            console.log("departmentsProvider->getByGuid Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM departments WHERE guid=? AND id IS NOT NULL AND isDeleted=0`, [params.guid,], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					guid: row.guid,
					name: row.name,
				}                
                result = recordToReturn;
            },
            function() {
                console.log("departmentsProvider->getByGuid Finished (callback)");
                console.log("departmentsProvider->getByGuid this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

async function listForGrid(params, callback) {
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("departmentsProvider->listForGrid Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM departments WHERE isDeleted=0`, [], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					guid: row.guid,
					name: row.name,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("departmentsProvider->listForGrid Finished (callback)");
                console.log("departmentsProvider->listForGrid this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

async function listForDropdown(params, callback) {
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("departmentsProvider->listForDropdown Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM departments WHERE isDeleted=0`, [], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					guid: row.guid,
					name: row.name,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("departmentsProvider->listForDropdown Finished (callback)");
                console.log("departmentsProvider->listForDropdown this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

async function listAll(params, callback) {
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.log(error.message);}
        db.serialize(() => {
            let result = [];
            console.log("departmentsProvider->listAll Started with params: " + JSON.stringify(params));
            db.each(`SELECT * FROM departments `, [], (error, row) => {
                if (error) {return console.log(error);}
                let recordToReturn = 
				{
					id: row.id,
					guid: row.guid,
					name: row.name,
					isDeleted: row.isDeleted,
				}                
                result.push(recordToReturn);
            },
            function() {
                console.log("departmentsProvider->listAll Finished (callback)");
                console.log("departmentsProvider->listAll this is the result: " + JSON.stringify(result));
                callback(null, result);
            });
        });
    });
}

// save
async function save(params, callback) {
    console.log("departmentsProvider->save Started: " + JSON.stringify(params));
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                console.log("departmentsProvider->save(update) Started");
                db.prepare(`UPDATE departments SET name=? WHERE id=?`, [params.name,params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("departmentsProvider->save(update) Finished");
                callback(null, "ok");
            });
        }
        else
        {
            db.serialize(() => {
                console.log("departmentsProvider->save(insert) Started");
                const uniqueUUID = uuid.v4();
                console.log("departmentsProvider->save Generated guid for new record: " + uniqueUUID);
                db.prepare(`INSERT INTO departments (name,guid,isDeleted) VALUES (?,?,?)`, [params.name,uniqueUUID,0]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("departmentsProvider->save(insert) Finished");
                callback(null, "ok");
            });            
        }
    });
}

// logic delete
async function deleteLogic(params, callback) {
    console.log("departmentsProvider->deleteLogic Started: " + JSON.stringify(params));
    const db = new sqlite3.Database(dbHelper.ReturnDBPath(), (error) => {
        if (error) {return console.error(error.message);}
        if (params.id > 0) {
            db.serialize(() => {
                console.log("departmentsProvider->deleteLogic(logic delete) Started");
                db.prepare(`UPDATE departments SET isDeleted=1 WHERE id=?`, [params.id]).run(
                    err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    }
                    ).finalize(err => {
                        if (err != null) { db.close(); console.log(err.message) };
                    });
                db.close();
                console.log("departmentsProvider->deleteLogic(logic delete) Finished");
                callback(null, "ok");
            });
        }
    });
}



module.exports = { getIdByGuid,getByGuid,listForGrid,listForDropdown,listAll,save,deleteLogic, }