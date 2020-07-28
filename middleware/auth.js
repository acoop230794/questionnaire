const { promisify } = require("util");
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.isLoggedIn = async (req, res, next) => {

    //CHECK IF COOKIE WITH NAME jwt EXISTS
    if( req.cookies.jwt ){

        //VERIFY THE TOKEN
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        console.log(decoded);

        const user = await User.findById(decoded.id);
        console.log(user);

        req.foundUser = user;

    }

    next();
}

exports.logOut = async (req, res, next) => {

    res.cookie('jwt', 'logout', {

        expiresIn: new Date (Date.now() * 2),
        httpOnly: true

    });

    next();
}