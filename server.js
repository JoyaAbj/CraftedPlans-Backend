require('dotenv').config();
const bodyParser = require("body-parser");
const connection = require('./config/connection');
const express=require('express');
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT,()=>{
    connection.checkConnection();
    console.log(`server is running on port:${process.env.PORT}`)
})