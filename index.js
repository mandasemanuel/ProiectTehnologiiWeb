"use strict";

const express = require('express');
const sequelize = require('./sequelize');

const User = require("./models/user");
const Food = require("./models/food");
const Category = require("./models/category");
const Group = require("./models/group");


// Relatii intre entitati

Category.hasMany(Food);
Group.hasMany(User);



const app = express();


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use((error, request, response, next) => {
    console.error(`[ERROR]: ${error}`);
    response.status(500).json(error);
  });

// app.use("/status",require("./routes/testRouter"));
app.use("/app", require("./routes/users"));
app.use("/app", require("./routes/foods"));
app.use("/app", require("./routes/categories"));
app.use("/app", require("./routes/groups"));

app.listen(7000, async () => {
    console.log('Server started on http://localhost:7000');
    try {
        await sequelize.authenticate();
        console.log("Connection has been established succesfully");
    } catch (err) {
        console.error("Unable to connect to the database: ", error);
    }
})