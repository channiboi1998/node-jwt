const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const { username, password } = request.body;
    
    if (!username || !password) {
        return response.status(500).send('Username or Password is required!');
    }

    let data = {
        msg: 'Hello bhie',
        token: jwt.sign({ username: username }, process.env.SECRET_KEY)
    };

    response.json(data);
}

const dashboard = async (request, response) => {

    let data = {};

    const headerAuth = request.headers.authorization;

    if (!headerAuth || !headerAuth.startsWith('Bearer ')) {
        data.msg = 'Authentication Failed';
        response.status(500).json(data);
    }

    const token = headerAuth.split(' ')[1];

    data.secret = token;
    try {
        jwt.verify(token, process.env.SECRET_KEY);
    } catch(error) {
        data.msg = 'Token expired';
        response.status(500).json(data);
    }

    data.msg = 'Token Verfied, hello Chrishern';

    response.json(data);
}

module.exports = {
    login,
    dashboard
}