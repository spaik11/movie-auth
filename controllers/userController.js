const User = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
    home: (req, res) => {
        if (req.isAuthenticated()) {
            return res.render('main/getMovies');
        }
        return res.render('main/login');
    },

    register:  (req, res) => {
        const { name, email, password } = req.body;

        User.findOne({ email }).then(user => {
            if (user) {
                return res.render('main/login', { regErrors: 'This email already registered' });
            }
            const newUser = new User();
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
    
            newUser.name = name;
            newUser.email = email;
            newUser.password = hash;
    
            newUser
                .save()
                .then(user => {
                    req.login(user, (err) => {
                        if(err) {
                            return res.status(500).json({ message: 'Server Error' })
                        } else {
                            return res.redirect('/movies/home')
                        }
                    })
                })
                .catch(err => reject(err));
        })
        .catch((err) => res.status(418).json({ message: 'App is broken', err }));
    },    

    logout: (req, res) => {
        req.session.destroy();
        req.logout();
        return res.redirect('/users');
    }
};