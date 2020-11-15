const jwt = require('jsonwebtoken')
const secret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'
module.exports = {
    generate_token: function (username) {
        const static_admin = username
        return jwt.sign(static_admin, secret)
    },
    validate_token: function (req, res, next) {
        const auth_header = req.headers['authorization']
        const token = auth_header && auth_header.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, secret, (err, user) => {
            if (err)
                res.sendStatus(403)
            next()
        })
    }
}