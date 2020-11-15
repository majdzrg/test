const express = require('express')
const router = express.Router()
const candidatCtrl = require('../controllers/candidatController')
const adminCtrl = require('../controllers/adminController')
const auth = require('../services/auth')

router.route('/candidat').post(candidatCtrl.createCandidat)
// admin 
router.route('/admin').post(adminCtrl.login)
router.use(auth.validate_token)
router.route('/candidat').get(candidatCtrl.getAllCandidat)
router.route('/candidat/:id').get(candidatCtrl.candidatGetById)
router.route('/candidat/:id').patch(candidatCtrl.candidatUpdate)


module.exports = router