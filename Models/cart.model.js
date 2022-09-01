module.exports = (sequelize,Sequelize) =>{

    const cart = sequelize.define('carts',{
        id :{
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        cost :{
            type : Sequelize.INTEGER
        }
    })

    return cart;
}