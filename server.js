import express from "express";
import bodyparse from "body-parser";
import Authroute from './server/Router/Authroute';
import blogpostAuthroute from'./server/Router/blogpostAuthroute'
import dotenv from"dotenv";
import mongoose from'mongoose'

dotenv.config({
    path:"./.env"
})
const app=express();
app.use(bodyparse.json());
app.use('/api/v1/blogpost',Authroute);
app.use('/api/v1/blogpost',blogpostAuthroute);


app.use('/',(req,res) => {
    res.status(200).json({
        statu:(200),
        message:"this route is not exist"


    })
})
const databaseurl=process.env. DATABASE
mongoose.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>{console.log("Db is successfully connected")})
const port=process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

export default app;