//initliazes express app and configure middleswares
const express = require('express')
const cors = require("cors");
const app = express()
const cookieParser = require("cookie-parser");
const authRoutes = require("./features/auth/auth.routes");

//middleware
app.use(
    cors({
        origin: "http://localhost:5173",  //TODO : FOR NOW.. CHANGE LATER
        credentials: true
    })
);

app.use(cookieParser())   //the backend receives the Supabase session and puts the tokens(refresh & access) into cookies.
app.use(express.json())


//APIs

app.get("/api/test", (req, res) => {   //!TEST
    res.json({
        success: true,
        message: "Frontend successfully connected to backend!"
    });
});

//auth routes

app.use("/api/auth", authRoutes);


module.exports = app;