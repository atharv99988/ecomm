const Product = require('../Models').Product
/**
 * handler to create a product
 */
exports.create = (req,res) =>{
    
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    }

    Product.create(product).then(product =>{
        console.log('success');
        res.status(200).send(product)
    }).catch(err =>{
        console.log('error'+ err.message);
        res.status(500).send({message : `some internal error occured ${err.message}`})
    })
}

/**
 * handler to edit a product
 */
exports.edit = (req,res) =>{
    const productId = req.params.id;

    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }

    Product.update(product,{where : {id : productId}}).then(product =>{

        Product.findByPk(productId).then(product =>{
            res.status(200).send(product)
        }).catch(err =>{
            res.send(500).send({message : `some internal error occured ${err.message}`})
        })

    }).catch(err =>{
        res.send(500).send({message : `some internal error occured ${err.message}`})
    })

}
/**
 * handler to delete a product
 */
exports.delete = (req,res) =>{

    const productId = req.params.id;

    Product.destroy({where : {id : productId}}).then(product =>{
        res.status(200).send({message : "product deleted sucessfully"})
    }).catch(err =>{
        res.send(500).send({message : `some internal error occured ${err.message}`})
    })
}
/**
 * handler to get all products
 */
exports.findAll = (req,res) =>{

    const productname = req.query.name;
    let promise;
    if(productname){
        promise = Product.findAll({where : {
            name : productname
        }})
    }else{
        promise = Product.findAll();
    }
    
    promise.then(product =>{
        res.status(200).send(product)
    }).catch(err =>{
        res.send(500).send({message : `some internal error occured ${err.message}`})
    })
}

/**
 * handler to get product by id
 */
exports.getById = (req,res) =>{
    const productId = req.params.id;

    Product.findByPk(productId).then(product =>{
        res.status(200).send(product)
    }).catch(err =>{
        res.send(500).send({message : `some internal error occured ${err.message}`})
    })

}