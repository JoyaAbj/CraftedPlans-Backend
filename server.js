require('dotenv').config();
const { initializeApp } =require("firebase/app");
const firebaseConfig =require('./config/firebase');
initializeApp(firebaseConfig);
const bodyParser = require("body-parser");
const connection = require('./config/connection');
const productsRoute=require('./routes/productsRoute');
const reviewsRoute=require('./routes/reviewsRoute');
const userRoute=require('./routes/userRoute');


const express=require('express');
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/orders',orderRoute);
// app.use('/planners',plannersRoute);
app.use('/products',productsRoute);
app.use('/reviews',reviewsRoute);
// app.use('/templates',templatesRoute);
app.use('/users',userRoute);

app.listen(process.env.PORT,()=>{
    connection.checkConnection();
    console.log(`server is running on port:${process.env.PORT}`)
})