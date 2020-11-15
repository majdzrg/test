const auth = require('../services/auth')

module.exports = {
    // static admin 
    login: function (req, res) {
        if (req.body.username === "superme" && req.body.password === "123123") {
            const token = auth.generate_token(req.body.username)
            res.status(200).send({
                message: "ok",
                token: token
            })
        } else {
            res.status(400).send({
                message: "wrong user name or password"
            })
        }
    }
}