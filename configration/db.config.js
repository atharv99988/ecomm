
module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "mysql",
    DB  : "ecom_db",
    dialect : 'mysql',
    pool : { 
        max : 5,    // max connections at a time.(5 * no of cores max thread can keept)
        min : 0,    // min connections at a time.
        acquire : 3000,     //  a client can wait at max 3000 sec to make connection.
        idle : 1000     //  if request not send thread will be realeased.
    }
}