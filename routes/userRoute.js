const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/userController');
// const mail=require('../controllers/mailController');
// router.get('/getAll',userControllers.getAll);
// router.get('/findOneById/:Id',userControllers.findOne);
// router.post('/findByRole',userControllers.findByRole);
// router.post('/login',userControllers.login);
router.post('/register',userControllers.register);
// router.delete('/deleteById/:Id',userControllers.deleteUser);
// router.put('/updateUser/:Id',userControllers.updateUser);
// router.post('/updatePassword/:Id',userControllers.updatePassword);
// router.post('/isValidPassword/:Id',userControllers.validPassword);
module.exports=router;