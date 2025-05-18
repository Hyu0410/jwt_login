const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

// 토큰 유효성 검사
async function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) { // 토큰이 없을 때
        console.log(`req.header: ${req.headers['authorization']}`);
        return res.status(401).json({
            "message": "there is no Token"
        });
    }

    try {
        const user = await verify(token, process.env.ACCESS_KEY);
        req.userId = user.userId;
        next();
    } catch (err) {
        console.log(`verify error: ${err}`);
        if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired." });
        } else {
        return res.status(403).json({ message: "Verify Error" });
        }
    }
}

module.exports = {
    authenticateAccessToken
}
