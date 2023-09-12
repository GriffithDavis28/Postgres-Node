const express = require('express');
const client = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const route = express();

route.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;
        console.log(req.body);
        const users = await client.query(`SELECT "email" FROM users WHERE "email" = ${req.body.email} `);
        if(users.rows.length === 0) return res.status(401).json({error: "Email is invalid"});

        const validPassword = await bcrypt.compare(req.body.password, users.rows[0].password);
        if(!validPassword) return res.status(401).json({error: "Password is incorrect"});
        else
        return res.status(200).json("Success");
    } catch (error) {
        res.status(500).json({error: error.message});       
    }
})

module.exports=route;