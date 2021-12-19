const e = require("express");
const User = require("../models/user")
const Food = require("../models/food")

const router = require("express").Router();

User.hasMany(Food);

router
    .route("/users")
    .get(async (req, res) => {
        try{
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            console.log(req.body);
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch(err) {
            return res.status(500).json(err);
        }
    })

    
router
    .route("/users/:id")
    .get(async (req,res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if(user){
                return res.status(200).json(user);
            } else {
                return res.status(404).json({error: `User with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req,res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if(user){
                const updateUser = await user.update(req.body);
                return res.status(200).json(user);
            } else {
                return res.status(404).json({error: `User with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const user = await User.findByPk(req.params.id);
        if(user){
            return res.status(200).json(await user.destroy())
        } else {
            return res.status(404).json( {error: `User with id ${req.params.id} not found`})
        }
    })

router
    .route("/users/:userId/foods")
    .post(async(req,res,next) => {
          try{
            const user = await User.findByPk(req.params.userId);
            if(user){
                const food = await Food.create(req.body);
                user.addFood(food);
                await user.save();
                res.status(201).location(food.id).send();
            } else {
                res.sendStatus(404);
            }
          } catch(err){
              next(err);
          }
    })
    .get(async(req,res,next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
              const foods = await user.getFoods();
              if (foods.length > 0) {
                res.json(foods);
              } else {
                res.sendStatus(204);
              }
              
            } else {
                res.sendStatus(404);
            }
          } catch (error) {
            next(error);
          }
    })

router
    .route("/users/:userId/foods/:foodId")
    .get(async(req,res,next) => {
        try {
            const user = await User.findByPk(req.params.userId)
            if (user) {
              const foods = await user.getFoods({
                  where: {id: req.params.foodId}
              });
              const food = foods.shift();
              if (food) {
                res.json(food);
              } else {
                res.sendStatus(404);
              }
            } else {
              res.sendStatus(404);
            }
          } catch (error) {
            next(error);
          }
    })
    .put(async(req,res,next) =>{
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const foods = await user.getFoods({
                    where: {id: req.params.foodId}
                });
              const food = foods.shift();
              if (food) {
                await food.update(req.body);
                res.status(204);
              } else {
                res.sendStatus(404);
              }
            } else {
              res.sendStatus(404);
            }
          } catch (error) {
            next(error);
          }
    })
    .delete(async(req,res,next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const foods = await user.getFoods({
                    where: {id: req.params.foodId}
                });
              const food = foods.shift();
              if (food) {
                await food.destroy();
                res.sendStatus(204);
              } else {
                res.sendStatus(404);
              }
            } else {
              res.sendStatus(404);
            }
          } catch (error) {
            next(error);
          }
    })


module.exports = router;

