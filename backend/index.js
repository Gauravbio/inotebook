const connecttoMongo=require('./db');
const express=require('express');
connecttoMongo();
const app=express();
const port=3000
app.use('/api/auth',require('./routes/auth'))
// app.use('/api/auth',require('./routes.notes'))
app.listen(port, () => {
    console.log(`example at http://localhost:${port}`)
})