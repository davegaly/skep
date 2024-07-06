const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');
const departmentsBusiness  = require('../business/departmentsBusiness.js');
const authBusiness  = require('../../../helpers/authManager.js');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



// getByGuid
departmentsRouter.get('/getByGuid/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
    departmentsProvider.getByGuid(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

// listForGrid
departmentsRouter.get('/listForGrid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("departmentsAPI->listForGrid Started");
    if (departmentsBusiness.listForGridAdjustInputCtx !== undefined) {
      await departmentsBusiness.listForGridAdjustInputCtx(ctx);
    }
    departmentsProvider.listForGrid(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listForGrid finished");
      resolve();
    });    
  });  
});

// listForDropdown
departmentsRouter.get('/listForDropdown', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("departmentsAPI->listForDropdown Started");
    if (departmentsBusiness.listForDropdownAdjustInputCtx !== undefined) {
      await departmentsBusiness.listForDropdownAdjustInputCtx(ctx);
    }
    departmentsProvider.listForDropdown(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listForDropdown finished");
      resolve();
    });    
  });  
});

// listAll
departmentsRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("departmentsAPI->listAll Started");
    if (departmentsBusiness.listAllAdjustInputCtx !== undefined) {
      await departmentsBusiness.listAllAdjustInputCtx(ctx);
    }
    departmentsProvider.listAll(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
departmentsRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise(async (resolve, reject) => {    
    if (departmentsBusiness.saveAdjustInputCtx !== undefined) {
      await departmentsBusiness.saveAdjustInputCtx(ctx);
    }
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    console.log("departmentsAPI->save(" + JSON.stringify(params) + ") Started");
    departmentsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->save finished");
      resolve();
    });    
  });  
});

// deleteLogic
departmentsRouter.get('/deleteLogic/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->deleteLogic(deleteLogic), wtih params " + JSON.stringify(ctx.params) + " Started");
    departmentsProvider.deleteLogic(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->deleteLogic finished");
      resolve();
    });    
  }); 
});

module.exports = departmentsRouter;