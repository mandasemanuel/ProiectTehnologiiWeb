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
            //console.log(req.body);
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch(err) {
            return res.status(400).json({message: 'Username or email already in use'});
        }
    })

router
    .route("/login")
    .post(async (req, res) => {
      try{
        //console.log(req.body)
        const users = await User.findAll({
          where: {
            username: req.body.username,
            password: req.body.password,
          }
        });
        if(users.length>0) {
          return res.status(200).json({
            userDetails: users[0].dataValues,
            token: users[0].dataValues.username
          });
        }
        return res.status(400).json({message: 'Bad combination'});
      }
      catch(err){
        return res.status(500).json(err)
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
                console.log(req.body)
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
    .route("/users/:userId/friendFoods")
    .get(async(req,res,next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
              const foods = await user.getFoods({
                where: {
                  available: true
                }
              });
              console.log(foods)
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

router
    .route("/users/:userId/group")
    .get( async(req, res, next) => {
      try {
        const user = await User.findByPk(req.params.userId);
        console.log(user)
        const group = []
        if (user) {
          if(user.dataValues.group.length > 2)
          {
            const ids = user.dataValues.group.split(",")
            for (const id of ids ){
              const user2 = await User.findByPk(id)
              if(user2){
                group.push(user2.dataValues)
              }
            }
          } else {
            const user3 = await User.findByPk(user.dataValues.group)
            if(user3) {
              group.push(user3.dataValues)
            }
          }

          res.json(group)
          
        } else {
            res.sendStatus(403);
        }
      } catch (error) {
        res.sendStatus(505);
      }
    })
    .put( async(req, res, next) => {
      try{
        const user = await User.findByPk(req.params.userId);
        if(user){
            console.log(req.body)
            const user2 = await User.findAll({
              where: {
                username: req.body.username
              }, 
              raw: true
            })
            if(user2[0]){
              const user2id = user2[0].id.toString()
              if(user.dataValues.group === ""){
                user.update( {
                  group: user2id
                })
              } else {
                let string = user.dataValues.group
                string += "," + user2id
                user.update( {
                  group: string
                })
              }
            } else {
              res.status(404).json({message: `User ${req.body.username} not found`})
            }
            res.sendStatus(200)

        } else {
            res.status(404).json({message: `User not found`})
        }
      } catch(err){
        console.log(err)
        res.sendStatus(502);
      }
    })

router
    .route("/users/:userId/deleteUserFromGroup")
    .put(async(req,res,next) => {
      console.log("am intrat pe delete")
      try {
        console.log(req.params.userId)
          const user = await User.findOne({
            where: {
              id: req.params.userId
            },
            raw: true
          });
          console.log(user)
          if (user) {
            console.log(req.body)
            if(user.group.length > 2) {
              let ids = user.group.split(",")
              for(let i=0;i<ids.length;i++){
                if(ids[i] === req.body.idp.toString()){
                  ids.splice(i,1)
                }
              }
              console.log(ids)
              let newGroup = ids.join(",")
              console.log(newGroup)
              User.update(
                {group: newGroup},
                { where: { id: req.params.userId}}
              )
            } else {
              User.update(
                {group: ""},
                { where: { id: req.params.userId}}
              )
            }
            res.sendStatus(201);
          } else {
            res.sendStatus(403);
          }
        } catch (error) {
          console.log(error)
          next(error);
        }
  })


router
  .route("/users/:userId/friends")
  .get( async(req, res, next) => {
    try {
      console.log('am intrat in friends')
      const user = await User.findByPk(req.params.userId);
      console.log(user)
      const friends = []
      if (user) {
        const users = await User.findAll()
        for ( const user2 of users ) {
          if(user2.group.length > 2) {
            const userGroup = user2.group.split(",")
            for(const idUser of userGroup){
              if(idUser === user.id.toString()) {
                friends.push(user2)
              }
            }

          } else {
            if(user2.group === user.id.toString()) {
              friends.push(user2)
            }
          }
          
        }
        res.json(friends)
        
      } else {
          res.sendStatus(403);
      }
    } catch (error) {
      res.sendStatus(505);
    }
  })


module.exports = router;

