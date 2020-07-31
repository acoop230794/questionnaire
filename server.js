const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');
const User = require('./models/user');

dotenv.config({path: './.env'});

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookie());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB is connected'));

app.post('/login', async (req,res) => {

    let userEmail = req.body.email;
    let userPassword = req.body.password;

    const user = await User.find({email: userEmail});

    if ( user.length > 0 ) {

        const isMatch = await bcrypt.compare(userPassword, user[0].password);

        if( isMatch ){

            const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {

                expiresIn: '90d'

            });

            console.log(token);

            const cookieOptions = {

                expires: new Date (

                    Date.now() + 90 * 24 * 60 * 60 * 1000

                ),

                httpOnly: true

            }

            res.cookie('jwt', token, cookieOptions);

            res.json({
                result: 'Login successful'
            });

        } else{

            res.json({
                result: 'Login details are incorrect'
            });

        }

    } else {

        res.json({
            result: 'Login details are incorrect'
        });
    }

});

app.get('/', auth.isLoggedIn , (req, res) => {

    if( req.foundUser ){
        res.json({
            result: 'You are logged in'
        });
    } else {
        res.redirect('/');
    }
});

app.post('/register', async (req, res) => {
    let userName = req.body.username;
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    let userConfPassword = req.body.passwordConf;
    let userScore = 0;
    let userTime = 0;

    
    if (userPassword == userConfPassword) {
        try {

            let hashedPassword = await bcrypt.hash(userConfPassword, 8);

            await User.create({
                username: userName,
                email: userEmail,
                password: hashedPassword,
                score: userScore,
                time: userTime
            });

            res.json({
                result: 'User registered'
            });

        } catch (error) {

            console.log(error);

            res.json({
                result: 'Email is taken'
            }); 

        }
    } else {
        res.json({
            result: 'Passwords do not match'
        });
    }

});

app.post('/quiz', async (req, res) => {
    let userScore = req.body.score;
    let userTime = req.body.time;

    try {

        await User.create({
            score: userScore,
            time: userTime
        });

        res.json({
            result: 'Score and time updated'
        });

    } catch (error) {

        console.log(error);

        res.json({
            result: 'Error updating score and time'
        }); 

    }
});

app.listen(5000, () => {
    console.log('Server are running on port: 5000');
});
