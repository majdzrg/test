const Candidat = require('../models/candidat').Candidat
const mail_service = require('../services/email')

module.exports = {
    createCandidat: async function (req, res) {
        // create candidatur
        let candidat_data = req.body
        // upload file
        try {
            if (!req.files) {
                res.status(400).send({
                    message: "required cv is missing"
                })
            } else {
                let cv = req.files.cv
                // move file
                cv.mv('./uploads/cv_' + candidat_data.email + '.pdf')
                // assign url to cv
                candidat_data.cv = 'cv_' + candidat_data.email + '.pdf'
                // send email
                let sent = await mail_service.send_confirm_email(candidat_data.email)
                // update email filed in candidat_data
                candidat_data['email_sent'] = sent

                let cand = new Candidat(candidat_data)
                cand.save(function (err, cand) {
                    if (err) {
                        console.log("Error saving candidatur");
                        throw err
                    }
                    res.status(200).json({
                        message: "candidatur created with succes",
                        candidat: cand,
                        id: cand._id
                    })
                })
            }
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    getAllCandidat: function (req, res) {
        // only for admin
        Candidat.find({}, (err, candidats) => {
            if (err) {
                console.log(err);
                throw err
            }
            let cands = []
            candidats.forEach(c => {
                cands.push(c)
            })
            res.status(200).json({
                message: "list fetched",
                candidats: cands
            })
        })

    },
    candidatGetById: function (req, res) {
        //only for admin
        Candidat.findById(req.params.id, (err, cand) => {
            if (err) {
                console.log(err);
                throw err
            }
            res.status(200).json({
                message: "candidat fetched",
                candidat: cand
            })
        })

    },
    candidatUpdate: function (req, res) {
        //only for admin
        Candidat.findByIdAndUpdate(req.params.id, req.body, (err, cand) => {
            if (err) {
                console.log(err);
                throw err
            }
            res.status(200).json({
                message: "candidat updated",
                candidat: cand
            })
        })
    },
}