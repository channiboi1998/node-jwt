const JWT = require('jsonwebtoken');
const { BadRequest } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const login = (request, response) => {

    //Fetching the inserted `username` and `password`
    const { username, password } = request.body;
    
    if (!username || !password) {
        //Either `username` or `password` or both is empty
        throw new BadRequest('Username or Password is required bro!');
    }

    let data = {
        msg: 'Successfully Logged In!',
        token: JWT.sign({ username: username }, process.env.SECRET_KEY)
    };

    response.status(StatusCodes.CREATED).json(data);
}

const dashboard = async (request, response) => {
    
    let data = {};
    data.msg = `Success Authentication ${request.user.username}`;
    data.string = 'Hello Christian';
    response.status(StatusCodes.OK).json(data);
    
}

module.exports = {
    login,
    dashboard
}