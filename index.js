const express = require('express');
const app = express();
const user = require('./routes/users');
const auth = require('./routes/auth');
//const bcrpyt = require('bcrpyt');

app.use(express.json());
app.use('/user', user);
app.use('/api/auth', auth);


app.listen(3001, () =>{
    console.log("Server is running on port 3001.....")
})