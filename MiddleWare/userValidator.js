const { User ,Sequelize,ROLES} = require("../Models");
const Op = Sequelize.Op;

async function dublicateCheck (req,res,next){
    // dublicate check 
    console.log('finding name');
    let flag = true;

    await User.findOne({
        where :{
            username : req.body.name
        }
    }).then(result =>{
        console.log(result);
        if(result && flag == true){
            res.status(400).send({message : "user already exists name"});
            flag = false;
            return 0;
        }
    }).catch(err =>{
        return ;
    })

    console.log('finding email');

    await User.findOne({
        where :{
            email : req.body.email
        }
    }).then(result => {
        console.log(result);
        if(result && flag == true){
            res.status(400).send({message : "user already exists email"});
            flag = false;
            return 0;
        }
    }).catch(err =>{
        return;
    })

    console.log('request sent further');

    if(flag){
        next();
    }
}


function  validRole (req,res,next){
    // valid role check
    let roles = req.body.roles;
    if(roles){
        for(const role of roles){
            if(!ROLES.includes(role)){
                res.status(400).send({message : 'role do not exist'});
                return;
            }
        }
    }
    next();
}

module.exports = {dublicateCheck,validRole}