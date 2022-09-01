if(process.env.NODE_ENV !== 'process'){
    require('dotenv').config();
}

module.exports = {
    PORT : process.env.PORT
}