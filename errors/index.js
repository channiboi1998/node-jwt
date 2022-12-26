const CustomError = require('./custom-error');
const BadRequest = require('./bad-request');
const Unauthenticated = require('./unauthenticated');

module.exports = {
    BadRequest,
    CustomError, 
    Unauthenticated
}