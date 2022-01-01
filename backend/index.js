const connecttoMongo=require('./db');
const express=require('express');
connecttoMongo();
const app=express();
const port=3000;
app.get('/',(req,res)=> {
    res.send("hello world");
})
app.listen(port, () => {
    console.log("example")
})