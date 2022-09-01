/**
 * all logical  stuff for processing category
 */

//handler to create category

const db = require('../Models')
const Category = db.Category;

exports.create = (req,res)=>{
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    Category.create(category).then(category =>{
        console.log(`category name : ${category.name} got inserted in db`);
        res.status(200).send(category);
    }).catch(err =>{
        console.log(`issue in inserting category name :${category.name} . Error message ${err.message}`);
        res.status(500).send({
            message : "some internal error occured"
        })
    })
}

exports.findAll = (req,res) =>{

    const categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({where :{name : categoryName}})
    }else{
        promise = Category.findAll()
    }

    promise.then(category =>{
        res.status(200).send(category);
    }).catch(err =>{
        res.status(500).send({message : `some internal errror occured error : ${err}` })
    });
}

exports.findOne = (req,res) =>{
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(category =>{
        res.status(200).send(category);
    }).catch(err =>{
        res.status(500).send({message : `some internal errror occured error : ${err}` })
    });
}

exports.update = (req,res) =>{

    const category = {
        name : req.body.name,
        description : req.body.description,
    }
    /**
     *  PUT request /ecomm/api/v1/categories/:id  PUT : request to update
     */

    const categoryId = req.params.id;

    Category.update(category , { 
        where : {id : categoryId},
        returning : true
    }).then(updateCategory =>{

        Category.findByPk(categoryId).then(category =>{
            res.status(200).send(category);
        }).catch(err =>{
            res.status(500).send({message : `some internal errror occured error : ${err}` })
        });

    }).catch(err =>{
        res.status(500).send({message : `some internal errror occured error : ${err}` })
    });
}


exports.delete  = (req,res) =>{
    const categoryId = req.params.id;

    Category.destroy({ where : {id : categoryId}}).then(deletecategory =>{
        res.status(200).send({message : "category got delete"});
    }).catch(err =>{
        res.status(500).send({message : `some internal errror occured error : ${err}` })
    });

}