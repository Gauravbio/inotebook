const connecttoMongo=require('./db');
var cors=require('cors');
const express=require('express');
const { Mongoose } = require('mongoose');
connecttoMongo();
const app=express();
const port=5000

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
    console.log(`inotebook backend listening at http://localhost:${port}`)
})