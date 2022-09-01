/**
 * this file will pull all functionality of models defined
 */

// create connection with data base 

const {Sequelize} = require('sequelize');
const config = require('../configration/db.config')

const sequelize =  new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect
    }
);

// i need to expose sequelize and category model

const db = {
    sequelize : sequelize,
    Sequelize : Sequelize,
    Category : require('./category.model')(sequelize,Sequelize),
    Product : require('./products.model')(sequelize,Sequelize),
    User : require('./user.model')(sequelize,Sequelize),
    Roles : require('./roles.model')(sequelize,Sequelize),
    ROLES : ['admin','customer'],
    Cart : require('./cart.model')(sequelize,Sequelize)
}

// relation between user and cart one to many
db.User.hasMany(db.Cart);
// relation between cart and product

db.Cart.belongsToMany(db.Product,{
    through : 'Cart_Product',
    foreignKey : 'cart_id',
    otherKey :'product_id'
});
db.Product.belongsToMany(db.User,{
    through : 'Cart_Product',
    foreignKey : 'product_id',
    otherKey :'cart_id'
});


db.Roles.belongsToMany(db.User,{
    through : "User_roles",
    foreignKey : 'role_id',
    otherKey : "user_id"
})

db.User.belongsToMany(db.Roles,{
    through : "User_roles",
    foreignKey : 'user_id',
    otherKey : "role_id"
})

module.exports = db