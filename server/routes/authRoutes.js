const {Router} = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
router.get('/', (req, res) => {
    res.send({message: "Hello world"})
})
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/verifyuser/:token', authController.verifyuser)

module.exports = router;