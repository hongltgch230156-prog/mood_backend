const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//import route
const userController = require('../controllers/userController')
//declare route
const userRoute = (app) => {
    app.route('/auth/register')
        .post(userController.createNewAccount)
    
    app.route('/auth/login')
        .post(userController.loginAccount)

}
module.exports = userRoute
