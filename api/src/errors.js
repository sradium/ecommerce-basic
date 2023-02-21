const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

const newError = (statusCode, message) => {
    const error = new Error(message);
    error.status = statusCode;
    return error;
};

// Error handler
// this is the error handler for the express app
const errorHandler = (err, req, res) => {
    const statusCode = err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ code: statusCode, message });
};

const errorMiddleware = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Return the error structure
    const statusCode = err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ code: statusCode, message })
  }

module.exports = {
  HTTP_STATUS_CODE,
  newError,
  errorMiddleware,
  errorHandler,
};
