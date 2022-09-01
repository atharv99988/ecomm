const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const serverConfig = require('./configration/server.config');
const db = require('./Models');
const { Roles, User } = require('./Models');
const Category = db.Category;
const Products = db.Product;

Category.hasMany(Products);
User.hasMany


app.use(bodyParser.json());

const init = ()=>{

    const bulkCreate = [
        {
            name : 'electtronic',
            description : " this is electronics items"
        },
        {
            name : 'kitchen',
            description : " this is kitchen items"
        }
    ]

    const bulkRoles = [
        {
           id : 1,
           roles : 'customer' 
        },
        {
            id : 2,
            roles : 'admin'
        }
    ]
    Category.bulkCreate(bulkCreate);
    Roles.bulkCreate(bulkRoles);
}


db.sequelize.sync({force : true}).then(()=>{
    console.log("table recreated");
    init();
}).catch((err)=>{
    console.log("some error occured");
    console.err(err);
})

// initialize routes
require('./Routes/category.routes')(app);
require('./Routes/product.routes')(app);
require('./Routes/auth.routes')(app);
require('./Routes/cart.routes')(app);


app.listen(serverConfig.PORT, ()=>{
    console.log("application is running at " + serverConfig.PORT);
})