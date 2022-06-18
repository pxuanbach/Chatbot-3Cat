const {Router} = require('express');
const authController = require('../controllers/accountController');
const router = Router();

router.get('/getuser/:username', authController.getUserbyUsername)
router.get('/checkEmail/:email', authController.checkEmail)
router.get('/checkPhone/:phone', authController.checkPhone)

router.put('/checkPass/', authController.checkPass)
router.put('/updateUser/', authController.updatePersonal)
router.put('/updatePassword/', authController.updatePassword)
module.exports = router;

