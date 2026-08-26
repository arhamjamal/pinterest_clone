//initliazes express app and configure middleswares
const express = require('express')
const cors = require("cors");
const app = express()

//middleware
app.use(
    cors({
        origin: "http://localhost:5173",  //TODO : FOR NOW.. CHANGE LATER
        credentials: true
    })
);

app.use(express.json())

//apis
app.get("/api/test", (req, res) => {   //test
    res.json({
        success: true,
        message: "Frontend successfully connected to backend!"
    });
});



module.exports = app;