const connecttoMongo=require('./db');

const express=require('express');
const { Mongoose } = require('mongoose');
connecttoMongo();
const app=express();
const port=5000

app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
// app.use('/api/auth',require('./routes.notes'))
app.listen(port, () => {
    console.log(`example at http://localhost:${port}`)
})