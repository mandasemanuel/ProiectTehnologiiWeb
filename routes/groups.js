const e = require("express");
const Group = require("../models/group")

const router = require("express").Router();


router
    .route("/groups")
    .get(async (req, res) => {
        try{
            const groups = await Group.findAll();
            return res.status(200).json(groups);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            console.log(req.body);
            const newGroup = await Group.create(req.body);
            return res.status(200).json(newGroup);
        } catch(err) {
            return res.status(500).json(err);
        }
    })

    
router
    .route("/groups/:id")
    .get(async (req,res) => {
        try {
            const group = await Group.findByPk(req.params.id);
            if(group){
                return res.status(200).json(group);
            } else {
                return res.status(404).json({error: `Group with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req,res) => {
        try {
            const group = await Group.findByPk(req.params.id);
            if(group){
                const updateUser = await group.update(req.body);
                return res.status(200).json(group);
            } else {
                return res.status(404).json({error: `Group with id ${req.params.id} not found`})
            }
            
        } catch(err) {
            
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const group = await Group.findByPk(req.params.id);
        if(group){
            return res.status(200).json(await group.destroy())
        } else {
            return res.status(404).json( {error: `Group with id ${req.params.id} not found`})
        }
    })


module.exports = router;

