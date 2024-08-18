const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');
const departmentsBusiness  = require('../business/departmentsBusiness.js');
const authBusiness  = require('../../../helpers/authManager.js');
const logger = require('../../../helpers/logger');
const ApiManager = require('../../../helpers/apiManager');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



// getByGuid
departmentsRouter.get('/getByGuid/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("departmentsAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
  try {
    const result = await departmentsProvider.getByGuid(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the API");
    logger.error("departmentsAPI->getByGuid failed: " + err.message);
  }
  logger.log("departmentsAPI->getByGuid finished");
});


// listForGrid
departmentsRouter.get('/listForGrid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("departmentsAPI->listForGrid Started");
  if (departmentsBusiness.listForGridAdjustInputCtx !== undefined) {
    await departmentsBusiness.listForGridAdjustInputCtx(ctx);
  }
  try {
    const result = await departmentsProvider.listForGrid(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("departmentsAPI->listForGrid failed: " + err.message);
  }
  logger.log("departmentsAPI->listForGrid finished");
});


// listForDropdown
departmentsRouter.get('/listForDropdown', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("departmentsAPI->listForDropdown Started");
  if (departmentsBusiness.listForDropdownAdjustInputCtx !== undefined) {
    await departmentsBusiness.listForDropdownAdjustInputCtx(ctx);
  }
  try {
    const result = await departmentsProvider.listForDropdown(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("departmentsAPI->listForDropdown failed: " + err.message);
  }
  logger.log("departmentsAPI->listForDropdown finished");
});


// listAll
departmentsRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("departmentsAPI->listAll Started");
  if (departmentsBusiness.listAllAdjustInputCtx !== undefined) {
    await departmentsBusiness.listAllAdjustInputCtx(ctx);
  }
  try {
    const result = await departmentsProvider.listAll(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("departmentsAPI->listAll failed: " + err.message);
  }
  logger.log("departmentsAPI->listAll finished");
});


// save
departmentsRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  if (departmentsBusiness.saveAdjustInputCtx !== undefined) {
    let adjustResult = await departmentsBusiness.saveAdjustInputCtx(ctx);
    if (adjustResult.isClientInputValid == false) {
      ctx.body = ApiManager.BuildAPIResponse(true, null, null, adjustResult);
      return;
    }    
  }
  let params = {id: ctx.request.body.id, name: ctx.request.body.name, altroCampo: ctx.request.body.altroCampo, dataInizio: ctx.request.body.dataInizio};
  logger.log("departmentsAPI->save(" + JSON.stringify(params) + ") Started");
  try {
    const result = await departmentsProvider.save(params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("departmentsAPI->save failed: " + err.message);
  }
  logger.log("departmentsAPI->save finished");
});


// deleteLogic
departmentsRouter.get('/deleteLogic/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("departmentsAPI->deleteLogic(deleteLogic), with params " + JSON.stringify(ctx.params) + " Started");
  try {
    const result = await departmentsProvider.deleteLogic(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("departmentsAPI->deleteLogic failed: " + err.message);
  }
  logger.log("departmentsAPI->deleteLogic finished");
});


module.exports = departmentsRouter;