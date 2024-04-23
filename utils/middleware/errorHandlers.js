const boom = require('@hapi/boom');
const Sentry = require("@sentry/node");
const { config } = require("../../config");
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

Sentry.init({ dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}` });

function withErrorStack(err, stack) {
    if(config.dev){
        return {...err, stack}
    }
}

function logErrors(err, req, res, next){
    Sentry.captureException(err);
    console.log(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}

// catch erros for AJAX request or errors while streaming
function clientErrorHandler(err, req, res, next){
    const {output:{statusCode,payload}} = err;
    if(isRequestAjaxOrApi(req) || res.headersSent){
        res.status(statusCode).json(withErrorStack(payload,err.stack));
    }else{
        next(err);
    }
}
// catch errors while streaming
function errorHandler(err, req, res, next){    
    const {output:{statusCode,payload}} = err;   
    res.status(statusCode);
    res.render("error", withErrorStack(payload,err.stack));
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler,
    wrapErrors
}