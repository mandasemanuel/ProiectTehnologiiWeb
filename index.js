"use strict";

const express = require('express')



const app = express();


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use("/status",require("./routes/testRouter"));

app.listen(7000, () => {
    console.log('Server started on http://localhost:7000');
})