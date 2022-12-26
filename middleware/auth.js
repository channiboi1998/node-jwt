const JWT = require('jsonwebtoken');
const { Unauthenticated, BadRequest } = require('../errors');

const authMiddleware = async (request, response, next) => {

    const auth = request.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
        //Either there is no `authentication` variable on the header or it the string is not starting with `Bearer `.
        throw new BadRequest('Token is not present bro!');
    }

    const token = auth.split(' ')[1];

    try {

        const decoded = JWT.verify(token, process.env.SECRET_KEY);
        const { username } = decoded;
        request.user = { username: username };
        next();
        
    } catch(error) {
        //The token is invalid or expired
        throw new Unauthenticated('Token expired or invalid!');
    }

}

module.exports = {
    authMiddleware
}