const authController = require('../Controller/auth.controller');
const authValidator = require('../MiddleWare').userValidator

module.exports = (app) =>{
    app.post('/ecomm/api/v1/auth/signUp',[authValidator.dublicateCheck,authValidator.validRole,],authController.signUp);
    app.get('/ecomm/api/v1/auth/signIn',authController.sighIn);
}