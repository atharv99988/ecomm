
const {User,Roles,Sequelize}= require('../Models');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken')
const key = require('../configration/secret.config')


/**
 * handler for sign up
 */

exports.signUp = (req,res) =>{

    const userObj = {
        username :req.body.name,
        email : req.body.email,
        password  : bcrypt.hashSync(req.body.password,8) // need to encrypt it
    } 

    User.create(userObj).then(user =>{
        if(req.body.roles){
            // check if role is supported or get gets object of roles provided
            Roles.findAll({
                where :{
                    roles : { 
                        [Op.or] : req.body.roles // or operation in sequelize
                    }
                }
            }).then(result => {
                // set roles with use
                user.setRoles(result).then( result =>{
                    res.status(201).send({message : "user resigestered successfully"})
                })
            }).catch(err =>{
                console.log(err.message);
                res.status(500).send({message : 'some internal error occured'});
            })
        }else{

            // User.setRoles({
            //     id : 1,
            //     roles : 'customer'
            // }).then(result =>{
            //     res.status(201).send({message : "user resigestered successfully"})
            // }).catch(err =>{
            //     console.log(err.message);
            //     req.status(500).send({message : 'some internal error occured'});
            // })

            // we can send direct id to setROles method

            user.setRoles([1]
            ).then(result =>{
                res.status(201).send({message : "user resigestered successfully"})
            }).catch(err =>{
                console.error(err.message);
                req.status(500).send({message : 'some internal error occured'});
            })

        }

    }).catch(err =>{
        res.status(500).send({message : 'some internal error occured'})
    })

}

/**
 * handler for sign in
 */
exports.sighIn = (req,res) =>{
    // check if user exists
    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(user =>{
        //  if user is not present 
        if(!user){
            res.status(404).send({message : 'user not found'})
            return;
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password , user.password)

        if(!passwordIsValid){
            res.status(404).send({message : 'password not valid'})
            return;
        }

        var token = jwt.sign({id : user.id},key.secretKey,{
            expiresIn : 300 // this should be kept in config file
        })

        var authroties = [];

        user.getRoles().then( result =>{
            for (const iterator of result) {
                authroties.push(iterator.roles);
            }
            res.status(200).send({
                id : user.id,
                name : user.name,
                email : user.email,
                roles : authroties,
                Accesstoken : token
            })
        }).catch(err =>{
            console.log('error = ::'+ err.message);
            res.status(400).send({ message : 'some internal error'})
        })
    }).catch(err =>{
        res.status(500).send({message : "some internal error occured"})
    })
}