const express = require('express');
const route = express();
const { client } = require('../database');
const bcrypt = require('bcrypt');

route.use(express.json());

client.connect();

route.get('/', async (req, res) => {
    try{
        const users = await client.query('Select * from users');
        res.json({users: users.rows});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
})

route.post('/', async (req, res) => {
    try {
        const hashedPassword= await bcrypt.hash(req.body.password, 10);
        const newUser= await client.query(
            'INSERT INTO public.users("name", "email", "password") VALUES( $1, $2, $3);',
            [req.body.name, req.body.email, hashedPassword]);
        res.json({users: newUser.rows[0]});
    } catch (error) {
        res.status(500).json({error: "Email already exists"});
        console.log( "Email already exists");
    }            
})


module.exports=route;