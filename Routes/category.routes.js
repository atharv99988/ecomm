/**
 * this file is responsible for resposing the request  to the correst controller.
 * 
 */

const categoryController = require('../Controller').categoryController;
const {CategoryValidator,tokenValidator} = require('../MiddleWare/')

module.exports = (app) =>{
    app.post('/ecomm/api/v1/categories',
    [CategoryValidator,tokenValidator.validateToken,tokenValidator.isAdmin]
    ,categoryController.create);

    app.get('/ecomm/api/v1/categories',categoryController.findAll);
    app.get('/ecomm/api/v1/categories/:id',categoryController.findOne);
    app.put('/ecomm/api/v1/categories/:id',[CategoryValidator,tokenValidator.validateToken,tokenValidator.isAdmin],categoryController.update);
    app.delete('/ecomm/api/v1/categories/:id',[tokenValidator.validateToken,tokenValidator.isAdmin],categoryController.delete);
}
