const { Cart,Product,Sequelize } = require("../Models");
const Op = Sequelize.Op;

// handler to add cart
exports.addCart = (req,res) =>{
    const cart ={
        userId : req.userId
    };

    // const items = req.body.items;
    // if(items){
    //     cart.items = items
    // }

    Cart.create(cart).then( result =>{
        res.status(200).send(result);
    }).catch(err =>{
        console.log(err.message);
        res.status(500).send({message : 'some internalerror occured'})
    })
}
// handler to add items in cart
exports.addItem = (req,res) =>{

    const products = req.body.products;
    const cartId = req.params.id;
    // get cart
    console.log(cartId);
    Cart.findByPk(cartId).then(cart =>{
        console.log(cart);
        if(!cart){
            res.status(500).send({message : 'cart not created for this user'})
            return;
        }
        // get products
        Product.findAll({
            where : {
                id : {
                    [Op.or] : products
                }
            }
        }).then(products =>{
            // add products to cart return the cart obj
            if(!products){
                res.status(400).send({
                    message: "added products doesn't exists"
                })
                return;
            }
            cart.setProducts(products).then(resultCart =>{
                console.log("products added to cart");
                let response = [];
                cart.getProducts().then(result =>{
                    var cost =0 ;
                    for(prod of result){
                        response.push({
                            id : prod.id,
                            name : prod.name,
                            cost : prod.cost
                        })
                        cost += prod.cost;
                    }
                    res.status(200).send({
                        id : cartId,
                        list : response,
                        cost : cost
                    })
                })
            }).catch(err =>{
                console.log(err.message);
                res.status(500).send({message : 'some internal error occured'})
            })
        })
    }).catch(err =>{
        console.log(err.message);
        res.status(500).send({message : 'some internal error occured'})
    })
    

}
// handler to get items in cart
exports.getItems = (req,res) =>{

    Cart.findByPk(req.params.id).then(cart =>{
        console.log(cart);
        if(!cart){
            res.status(500).send({message : 'cart not found'})
            return;
        }
        // get products
        
        let response = [];
        console.log("products searching in cart");
        cart.getProducts().then(result =>{
            var cost =0 ;
            for(prod of result){
                response.push({
                    id : prod.id,
                    name : prod.name,
                    cost : prod.cost
                })
                cost += prod.cost;
            }
                res.status(200).send({
                    id : cartId,
                    list : response,
                    cost : cost
                })
            })
        }).catch(err =>{
            console.log(err.message);
            res.status(500).send({message : 'some internal error occured'})
        })
   
}
