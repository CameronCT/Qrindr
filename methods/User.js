module.exports = function(conn, jwt, config) {
    const createJWT = function(userName) {
        const token = jwt.sign({ userData }, config.JWT.key, {
            algorithm: "HS256",
            expiresIn: config.JWT.expiryMin,
        });
        return token;
    }
    const findOrCreate = function(data, callback) {
        conn.query('SELECT userId, userName, userAuthId, userAuthName, userAuthCode FROM users WHERE userAuthId = ? AND userAuthName = ?', [data.authId], function (err, result) {
            if (err) return err;

            if (result.length > 0) {
                userData = {
                    'userId': result[0].userId,
                    'userName': result[0].userName,
                    'userAuthCode': result[0].userAuthCode,
                    'userAuthId': data.authId,
                    'userAvatar': data.userAvatar,
                };
                callback(err, userData);
            }
            if (!result || result.length <= 0) {
                let authCode = (Math.floor(Math.random() * (9999 - 0 + 1)) + 0);
                conn.query('INSERT INTO users ( userName, userAuthName, userAuthId, userAuthCode ) VALUES ( ?, ?, ?, ? )', [data.userName, data.authId, authCode], function (err, result) {
                    userData = {
                        'userId': result.insertId,
                        'userName': data.userName,
                        'userAuthCode': authCode,
                        'userAuthId': data.authId,
                        'userAvatar': data.userAvatar,
                    };
                    callback(err, userData);
                });
            }
        });
    }
    const session = function(req, res) {
        const token = req.cookies.token
        let payload = {};

        if (!token) {
            return res.status(401).end()
        }

        try {
            payload = jwt.verify(token, config.JWT.key)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }
            return res.status(400).end()
        }
        return res.send({ session: payload });
    }

    return { createJWT, findOrCreate, session };

}