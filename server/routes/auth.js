const express = require('express')
const router = express.Router();

const{register,login,forgotpassword,updateProfile,resetpassword,users,deleteUser,updateUser,getUser,findUser,usersData,totalUsers,userNames}=require('../controller/auth')
router.route('/findUser').get(findUser)
router.route('/users').get(users)
router.route('/totalUsers').get(totalUsers)
router.route('/userNames').get(userNames)

router.route('/usersData').get(usersData)
router.route('/user').get(getUser)
router.route('/user').delete(deleteUser)
router.route('/updateuser/:id').put(updateUser)
router.route('/updateProfile/:id').put(updateProfile)
router.route('/register').post(register)
router.route("/login").post(login)
router.route('/forgotpassword').post(forgotpassword)
router.route('/passwordreset/:resetToken').put(resetpassword)

module.exports =router