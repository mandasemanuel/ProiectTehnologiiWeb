const e = require("express");
const Category = require("../models/category")

const router = require("express").Router();


router
    .route("/categories")
    .get(async (req, res) => {
        try{
            const categories = await Category.findAll();
            return res.status(200).json(categories);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            console.log(req.body);
            const newCategory = await Category.create(req.body);
            return res.status(200).json(newCategory);
        } catch(err) {
            return res.status(500).json(err);
        }
    })


router
    .route("/categories/:id")
    .get(async (req,res) => {
        try {
            const categoy = await Category.findByPk(req.params.id);
            if(categoy){
                return res.status(200).json(categoy);
            } else {
                return res.status(404).json({error: `Category with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req,res) => {
        try {
            const categoy = await Category.findByPk(req.params.id);
            if(categoy){
                const updateCategory = await categoy.update(req.body);
                return res.status(200).json(categoy);
            } else {
                return res.status(404).json({error: `Category with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const categoy = await Category.findByPk(req.params.id);
        if(categoy){
            return res.status(200).json(await categoy.destroy())
        } else {
            return res.status(404).json( {error: `Category with id ${req.params.id} not found`})
        }
    })


module.exports = router;

