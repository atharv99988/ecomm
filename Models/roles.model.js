
/**
 * this is schema for roles
 */

module.exports = (sequelize,Sequelize) =>{

    const roles = sequelize.define('roles',{
        id:{
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        roles : {
            type : Sequelize.STRING
        }
    })
    
    return roles;
}