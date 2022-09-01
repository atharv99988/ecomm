const tokenValidator = require('../MiddleWare').tokenValidator
const cartController = require('../Controller/cart.controller')

module.exports = (app) =>{
    app.post('/ecomm/api/v1/carts',[tokenValidator.validateToken],cartController.addCart);
    app.post('/ecomm/api/v1/carts/addItems/:id',[tokenValidator.validateToken],cartController.addItem);
}