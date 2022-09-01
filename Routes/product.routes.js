const productController = require('../Controller').productController;
const {ProductValidator,tokenValidator} = require('../MiddleWare')

module.exports = (app) =>{
    app.post('/ecomm/api/v1/products',[ProductValidator,tokenValidator.validateToken,tokenValidator.isAdmin],productController.create);
    app.get('/ecomm/api/v1/products',productController.findAll);
    app.get('/ecomm/api/v1/products/:id',productController.getById);
    app.put('/ecomm/api/v1/products/:id',[tokenValidator.validateToken,tokenValidator.isAdmin],productController.edit);
    app.delete('/ecomm/api/v1/products/:id',[tokenValidator.validateToken,tokenValidator.isAdmin],productController.delete);
}
