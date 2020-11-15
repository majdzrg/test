const nodemailer = require('nodemailer')

module.exports = {
    send_confirm_email: function (distantion) {
        // config
        // in real case those data would be parsed from env
        const config = {
            service: 'gmail',
            auth: {
                user: 'majdzrg@gmail.com',
                pass: 'majdzr20616717'
            }
        }
        // mail_option
        const mail_options = {
            from: 'majdzrg@gmail.com',
            to: distantion,
            subject: 'candidature soumise avec succès',
            text: 'Merci pour la soumission de votre candidature'
        }
        // send
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport(config)
            transporter.sendMail(mail_options, function (error, info) {
                if (error) {
                    console.log('error while sending email'),
                        console.log(error)
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }
}