const e = require("express");
const Food = require("../models/food")

const router = require("express").Router();


router
    .route("/foods")
    .get(async (req, res) => {
        try{
            const foods = await Food.findAll();
            return res.status(200).json(foods);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            console.log(req.body);
            const newFood = await Food.create(req.body);
            return res.status(200).json(newFood);
        } catch(err) {
            return res.status(500).json(err);
        }
    })


router
    .route("/foods/:id")
    .get(async (req,res) => {
        try {
            const food = await Food.findByPk(req.params.id);
            if(food){
                return res.status(200).json(food);
            } else {
                return res.status(404).json({error: `Food with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req,res) => {
        try {
            const food = await Food.findByPk(req.params.id);
            if(food){
                const updateFood = await food.update(req.body);
                return res.status(200).json(food);
            } else {
                return res.status(404).json({error: `Food with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const food = await Food.findByPk(req.params.id);
        if(food){
            return res.status(200).json(await food.destroy())
        } else {
            return res.status(404).json( {error: `Food with id ${req.params.id} not found`})
        }
    })


module.exports = router;