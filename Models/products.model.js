module.exports = (sequelize,Sequelize) =>{

    const Product = sequelize.define('Product',{
        id: {
            
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true

        },
        name : {

            type : Sequelize.STRING,
            allowNull : false

        },
        description :{

            type : Sequelize.STRING,
            allowNull : true

        },
        cost: {
            
            type : Sequelize.INTEGER,
            allowNull : false
        }
    },{
        tableName : 'products'
    });

    return Product
}