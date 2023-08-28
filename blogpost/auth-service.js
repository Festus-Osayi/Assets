const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config()

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    loginHistory: [
        {
            dateTime: Date,
            userAgent: String
        }
    ]
})

let User;

module.exports.initialize = function () {

    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_URL, { useNewUrlParser: true });
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            console.log('created a users model successfully..')
            resolve();
        });
    });
};

// This function performs some data validation (ie: do the passwords match? Is the user name already taken?), return meaningful errors if the data is invalid, as well as saving userData to the database (if no errors occurred).

module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(userData.password, salt, function (err, hash) {
                    if (err) {
                        reject("error encrypting password");
                    }
                    else {
                        userData.password = hash;
                        let newUser = new User(userData);
                        newUser.save().then(data => {
                            resolve(data)
                        }).catch(err => {
                            if (err) {
                                if (err.code === 11000) {
                                    reject("User Name already taken");
                                }
                                else {
                                    reject("There was an error creating the user: " + err);
                                }
                            }
                            else {
                                resolve();
                            }

                        })

                    }
                })
            })
        }
    })

}

// This function functionality is to find, the user in the database whose userName property matches userData.userName, the provided password.

module.exports.checkUser = (userData) => {
    return new Promise((resolve, reject) => {
        User.find({ userName: userData.userName })
            .exec()
            .then(users => {
                bcrypt.compare(userData.password, users[0].password).then(result => {
                    if (result === true) {
                        users[0].loginHistory.push({ dateTime: (new Date()).toString(), userAgent: userData.userAgent });
                        User.updateOne(
                            { userName: users[0].userName },
                            { $set: { loginHistory: users[0].loginHistory } }

                        )
                            .exec()
                            .then(() => { resolve(users[0]) })
                            .catch(err => { reject("There was an error verifying the user: " + err) })
                    }
                    else {
                        reject(`Incorrect Password for user: ${userData.userName}`);
                    }
                })
            })
            .catch(() => {
                reject(`Unable to find user: ${userData.userName}`);
            })
    })
}