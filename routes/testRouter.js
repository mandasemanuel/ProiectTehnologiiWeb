const router = require('express').Router();

router
    .route("/test")
    .get((req,res) => {
        return res.status(200).json({Status: "OK"});
    })

module.exports = router;