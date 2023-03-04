const jwt = require('jsonwebtoken');

const CreateToken = async (data) => {
    const Payload = { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data };
    return await jwt.sign(Payload, 'SecretKey123456789');
};

module.exports = CreateToken;
