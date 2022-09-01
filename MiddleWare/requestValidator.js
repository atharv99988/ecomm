const db= require('../Models')
exports.categoryCreateValidator = (req ,res,next) => {

    if(!req.body.name){
        res.status(400).send({message : "cannot create category without category name"})
        return 
    }

    if(!req.body.description){
        res.status(400).send({message : "cannot create category without descrition "})
        return
    }

    next();
}


exports.productCheck = (req,res,next) =>{

    if(!req.body.name){
        res.status(400).send({message : "cannot create product without  name"})
        return 
    }

    if(!req.body.description){
        res.status(400).send({message : "cannot create product without descrition "})
        return
    }

    if(!req.body.cost ){
        res.status(400).send({message : "cannot create product without cost "})
        return
    }

    if(!req.body.categoryId){
        res.status(400).send({message : "cannot create product without categoryId "})
        return
    }

    if(req.body.categoryId){
         db.Category.findByPk(req.body.categoryId).then( (category) =>{
            console.log("checking category");
            
            if(!category) {
                res.status(400).send({message : "category id do not exists"});
                return;
            }else{
                next();
            }
            console.log("did not returned");

        }).catch(()=>{
            res.status(400).send({message : "some internal error occured"})
            return ;
        })

    }
}
