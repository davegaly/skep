const Router = require('@koa/router');
const usersProvider = require('../db/providers/usersProvider.js');
const usersBusiness  = require('../business/usersBusiness.js');
const authBusiness  = require('../../../helpers/authManager.js');
const logger = require('../../../helpers/logger');
const ApiManager = require('../../../helpers/apiManager');

// Prefix all routes with: /items
const usersRouter = new Router({
  prefix: '/api/users',
});



// getByGuid
usersRouter.get('/getByGuid/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("usersAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
  try {
    const result = await usersProvider.getByGuid(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the API");
    logger.error("usersAPI->getByGuid failed: " + err.message);
  }
  logger.log("usersAPI->getByGuid finished");
});


// listForGrid
usersRouter.get('/listForGrid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("usersAPI->listForGrid Started");
  if (usersBusiness.listForGridAdjustInputCtx !== undefined) {
    await usersBusiness.listForGridAdjustInputCtx(ctx);
  }
  try {
    const result = await usersProvider.listForGrid(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->listForGrid failed: " + err.message);
  }
  logger.log("usersAPI->listForGrid finished");
});


// listForDropdown
usersRouter.get('/listForDropdown', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("usersAPI->listForDropdown Started");
  if (usersBusiness.listForDropdownAdjustInputCtx !== undefined) {
    await usersBusiness.listForDropdownAdjustInputCtx(ctx);
  }
  try {
    const result = await usersProvider.listForDropdown(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->listForDropdown failed: " + err.message);
  }
  logger.log("usersAPI->listForDropdown finished");
});


// listAll
usersRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("usersAPI->listAll Started");
  if (usersBusiness.listAllAdjustInputCtx !== undefined) {
    await usersBusiness.listAllAdjustInputCtx(ctx);
  }
  try {
    const result = await usersProvider.listAll(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->listAll failed: " + err.message);
  }
  logger.log("usersAPI->listAll finished");
});


// save
usersRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  if (usersBusiness.saveAdjustInputCtx !== undefined) {
    let adjustResult = await usersBusiness.saveAdjustInputCtx(ctx);
    if (adjustResult.isClientInputValid == false) {
      ctx.body = ApiManager.BuildAPIResponse(true, null, null, adjustResult);
      return;
    }    
  }
  let params = {id: ctx.request.body.id, email: ctx.request.body.email, password: ctx.request.body.password, displayName: ctx.request.body.displayName};
  logger.log("usersAPI->save(" + JSON.stringify(params) + ") Started");
  try {
    const result = await usersProvider.save(params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->save failed: " + err.message);
  }
  logger.log("usersAPI->save finished");
});


// updatePwd
usersRouter.post('/updatePwd', authBusiness.authCheckCredentials, async (ctx, next) => {
  if (usersBusiness.updatePwdAdjustInputCtx !== undefined) {
    let adjustResult = await usersBusiness.updatePwdAdjustInputCtx(ctx);
    if (adjustResult.isClientInputValid == false) {
      ctx.body = ApiManager.BuildAPIResponse(true, null, null, adjustResult);
      return;
    }    
  }
  let params = {id: ctx.request.body.id, email: ctx.request.body.email, password: ctx.request.body.password, displayName: ctx.request.body.displayName};
  logger.log("usersAPI->updatePwd(" + JSON.stringify(params) + ") Started");
  try {
    const result = await usersProvider.updatePwd(params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->updatePwd failed: " + err.message);
  }
  logger.log("usersAPI->updatePwd finished");
});


// deleteLogic
usersRouter.get('/deleteLogic/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  logger.log("usersAPI->deleteLogic(deleteLogic), with params " + JSON.stringify(ctx.params) + " Started");
  try {
    const result = await usersProvider.deleteLogic(ctx.params);
    ctx.body = ApiManager.BuildAPIResponse(true, result, null);
  } catch (err) {
    ctx.body = ApiManager.BuildAPIResponse(false, null, "error during the execution of the api");
    logger.error("usersAPI->deleteLogic failed: " + err.message);
  }
  logger.log("usersAPI->deleteLogic finished");
});


module.exports = usersRouter;