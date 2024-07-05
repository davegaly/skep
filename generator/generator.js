const fs = require("fs");

console.log("Generator Started!"); 

// settings e variabili
let structurePath = "./../apps/testapp/structure.json";   //TODO -> questo deve essere un array che supporta multi apps
let structureObject = {};
let structureCurrentTableObject = {};
let fileTemplateProvider = "./templateProvider.txt";
let contentTemplateSkeletonProvider = '';
let fileTemplateApi = "./templateAPI.txt";

let contentTemplateSingleAPI = '';
let filesToWrite = [];

// 1.0 - reads structure content (structure.json)
structureObject = JSON.parse(fs.readFileSync(structurePath, 'utf8'));
console.log("structureObject created succesfully!"); 

// 2.0 - creating a provider file for each table in the structure.json
function workTemplateValues() {

    // iterate tables in the structure
    Object.keys(structureObject.tables).forEach(tableIndex => {

        // 2.0 - reads templateProvider skeleton
        contentTemplateSkeletonProvider = fs.readFileSync(fileTemplateProvider, 'utf8');
        console.log("templateProvider skeleton read succesfully!"); 
            
        structureCurrentTableObject = structureObject.tables[tableIndex];
        console.log("Working on provider file for table: " + structureCurrentTableObject.tableName);

        console.log("Begin create provider content");
        let thisProviderContent = workTemplateSingleProvider();
        console.log("Finished create provider content");

        // susbstite list of functions
        contentTemplateSkeletonProvider = contentTemplateSkeletonProvider.replaceAll("##listAPIs##", thisProviderContent);
        console.log("Finished skeleton substitution");

        // module.exports for the functions
        listAPIsExport = buildExportFunctionsList();
        contentTemplateSkeletonProvider = contentTemplateSkeletonProvider.replaceAll("##listAPIsExport##", listAPIsExport);
        console.log("Finished modle.export substitution");

        // generics
        contentTemplateSkeletonProvider = contentTemplateSkeletonProvider.replaceAll("##tableName##", structureCurrentTableObject.tableName);
        
        // writes provider file
        fs.writeFileSync("./../apps/testapp/db/providers/" + structureCurrentTableObject.tableName + "Provider.js", contentTemplateSkeletonProvider);
        console.log(structureCurrentTableObject.tableName + "Provider.js" + " written - Prodiver file DONE!");

    })

    console.log("ALL PROVIDERS FILES DONE!");
}
workTemplateValues();
function workTemplateSingleProvider() {
    
    let contentProviderFile = '';
    for (let i = 0; i < structureCurrentTableObject.api.length; i++) {

        const apiObject = structureCurrentTableObject.api[i];
        console.log("Working Provider " + structureCurrentTableObject.tableName + ", api: " + apiObject.name);
        
        let templateProviderFileSingleFunctionPath = "./providerTemplates/" + apiObject.type + ".txt";
        let singleProviderFunctionTemplate = fs.readFileSync(templateProviderFileSingleFunctionPath, 'utf8');
        console.log("Reading single provider function template: OK");

        let contentThisProviderSingleFunction = '';
        contentThisProviderSingleFunction += singleProviderFunctionTemplate;
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##tableName##", structureCurrentTableObject.tableName);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##functionName##", apiObject.name);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##FieldsAsObject##", replaceFieldsAsObject(structureCurrentTableObject, apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##whereString##", replaceWhereString(apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##selectFields##", structureCurrentTableObject.selectFields);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##selectFrom##", structureCurrentTableObject.selectFrom);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##whereParams##", replaceWhereParams(apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listUpdateFieldsSQL##",  replaceListUpdateFieldsSQL(structureCurrentTableObject, apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listUpdateFieldsArray##", replaceListUpdateFieldsArray(structureCurrentTableObject, apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsSQL##", replaceListInsertFieldsSQL(structureCurrentTableObject, apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsValues##", replaceListInsertFieldsValues(structureCurrentTableObject, apiObject));  
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsArray##", replaceListInsertFieldsArray(structureCurrentTableObject, apiObject)); 

        // adds to the content for this provider file
        contentProviderFile += contentThisProviderSingleFunction + "\n\n";
    }
    
    // returns the content that will be included in the skeleton
    return contentProviderFile;
}


console.log("Generator All Good!"); 






// UTILITIES


function buildExportFunctionsList() {
    // builds the replacement content for module.exports = {} part of the skeleton
    let result = 'getIdByGuid,';
    for (let i = 0; i < structureCurrentTableObject.api.length; i++) {
        const apiObject = structureCurrentTableObject.api[i]; 
        result += apiObject.name + ",";
    }
    return result;
}



// writes the result
function writeTemplateContent() {
    Object.keys(filesToWrite).forEach(newFileToWrite => {
        let thisFileToWrite = filesToWrite[newFileToWrite];
        writeTemplateContentSingleFile(thisFileToWrite, function(data){
            console.log("Single file written: " + thisFileToWrite.path);  
        });
    });
    console.log("All files written");    
    console.log("Finished!");    
}
function writeTemplateContentSingleFile(params, callback) {
    fs.writeFile(params.path, params.content, (err,res) => {
        if(err) console.log(err);
        callback();
    });
}

function replaceKeyWordsSingleAPIContent(singleAPITemplateContent) {
    singleAPITemplateContent = singleAPITemplateContent.replaceAll("##tableName##", structureCurrentTableObject.tableName);

    let fieldsParamsBodySave = '';
    fieldsParamsBodySave = 'id: ctx.request.body.id'
    Object.keys(structureCurrentTableObject.fields).forEach(fieldIndex => {
        let fieldProperties = structureCurrentTableObject.fields[fieldIndex];
        fieldsParamsBodySave += ', ' + fieldProperties.fieldName + ": ctx.request.body." + fieldProperties.fieldName;
    });
    singleAPITemplateContent =  singleAPITemplateContent.replaceAll("##listParamsBodySave##", fieldsParamsBodySave); 

    return singleAPITemplateContent;
}

function replaceWhereString(apiObject) {
    let result = '';
    if (apiObject.whereString != undefined && apiObject.whereString != null && apiObject.whereString != '') {
        result += "WHERE " + apiObject.whereString;
    }
    return result;
}
function replaceWhereParams(apiObject) {
    let result = '';
    if (apiObject.whereParams != undefined && apiObject.whereParams != null) {
        Object.keys(apiObject.whereParams).forEach(fieldIndex => {
            let apiwhereParam = apiObject.whereParams[fieldIndex];
            result += apiwhereParam + ",";
        });
    }
    return result;
}
function replaceFieldsAsObject(tableObject, apiObject) {
    let result = '\t\t\t\t{\n';
    if (apiObject.apiReturnFields != undefined && apiObject.apiReturnFields != null) {
        Object.keys(apiObject.apiReturnFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.apiReturnFields[fieldIndex];
            result += '\t\t\t\t\t' + apiReturnFieldProperties + ": row." + apiReturnFieldProperties + ",";
            result += '\n';
        });
    }
    result += '\t\t\t\t}';
    return result;
}
function replaceListUpdateFieldsSQL(tableObject, apiObject) {
    let result = '';
    if (apiObject.updateFields != undefined && apiObject.updateFields != null) {
        Object.keys(apiObject.updateFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.updateFields[fieldIndex];
            result += apiReturnFieldProperties + '=?,';
        });
    }
    result = result.substring(0, result.length - 1); // removes last ,
    return result;
}
function replaceListUpdateFieldsArray(tableObject, apiObject) {
    let result = '[';
    if (apiObject.updateFields != undefined && apiObject.updateFields != null) {
        Object.keys(apiObject.updateFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.updateFields[fieldIndex];
            result += 'params.' + apiReturnFieldProperties + ",";
        });
    }
    result += 'params.id';
    result += ']';
    return result;
}
function replaceListInsertFieldsSQL(tableObject, apiObject) {
    let result = '';
    if (apiObject.insertFields != undefined && apiObject.insertFields != null) {
        Object.keys(apiObject.insertFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.insertFields[fieldIndex];
            result += apiReturnFieldProperties + ",";
        });
    }
    result = result.replace(/,*$/, '');
    return result;
}
function replaceListInsertFieldsValues(tableObject, apiObject) {
    let result = '';
    if (apiObject.insertFields != undefined && apiObject.insertFields != null) {    
        Object.keys(apiObject.insertFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.insertFields[fieldIndex];
            result += '?' + ",";
        });
    }
    result = result.replace(/,*$/, '');
    return result;
}
function replaceListInsertFieldsArray(tableObject, apiObject) {
    let result = '';
    if (apiObject.insertFields != undefined && apiObject.insertFields != null) {    
        Object.keys(apiObject.insertFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.insertFields[fieldIndex];
            result += 'params.' + apiReturnFieldProperties  + ",";
        });
    }    
    result = result.replace(/,*$/, '');
    return result;
}