// verify the token and get id from it
const jwt = require('jsonwebtoken')
const key = require('../configration/secret.config')
const {User} = require('../Models')


function isAdmin (req,res,next){
    const id = req.userId;
    console.log(id);
    if(!id){
        res.status(500).send({message : "user not authenticated"})
        return;
    }

    User.findByPk(id).then(user =>{
        console.log(`user === `+user);
        user.getRoles().then(rolesArr =>{
            console.log(rolesArr);
            for(let iterate of rolesArr){
                if(iterate.roles == 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({message : 'required Admin role'})
        }).catch(err =>{
            res.status(500).send({message : 'some internal error occured'})
        })

    })

}

function validateToken(req,res,next) {
    let token = req.headers['x-api-key'];

    if(!token){
        res.status(401).send({message : "token not provided"})
        return;
    }

    jwt.verify(token,key.secretKey, (err , decoded)=>{
        console.log('error '+ err);
        console.log('decoded message'+decoded);
        if(err){
            res.status(401).send({message :"Unauthorised"})
            return;
        }else{
            req.userId = decoded.id
            console.log(req.userId);
            next();
        }
        
    })
}

module.exports = {validateToken,isAdmin}