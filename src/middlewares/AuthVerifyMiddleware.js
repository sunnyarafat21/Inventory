const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const Token = req.headers.token;
    jwt.verify(Token, 'SecretKey123456789', (err, decoded) => {
        if (err) {
            console.log(Token);
            res.status(401).json({ status: 'unauthorized' });
        } else {
            const email = decoded.data;
            console.log(email);
            req.headers.email = email;
            next();
        }
    });
};
