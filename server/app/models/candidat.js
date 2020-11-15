var mongoose = require('mongoose')

var candidatSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        index: true,
        required: true,
        type: String
    },
    date_naissance: Date,
    num_tel: {
        type: Number,
        required: true
    },
    disponabilite: {
        type: Number,
        min: 0,
        max: 6
    },
    cv: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        min: 0
    },
    message: String,
    etat: {
        type: String,
        default: "Nouvelle"
    },
    register_date: {
        type: Date,
        default: function () {
            return Date.now()
        }
    },
    email_sent: Boolean
})

var Candidat = mongoose.model('candidat', candidatSchema)

module.exports = {
    Candidat: Candidat
}