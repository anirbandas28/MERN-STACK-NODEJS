const userModel = require('../models/user-model');
var jwt = require('jsonwebtoken');

class ApiController {
    // Create a new User Schema
    // createUser = async function(req, res) {
    //     try {
    //         const { email } = req.body;
    //         const userExist = await userModel.findOne({ email });

    //         if (userExist) {
    //             return res.status(409).send({
    //                 message: "User already exists"
    //             });
    //         }

    //         const newUser = new userModel(req.body);
    //         const savedUser = await newUser.save();
    //         res.status(200).send({
    //             data: savedUser,
    //             message: "User created successfully"
    //         });
    //     } catch (err) {
    //         res.status(500).send({
    //             message: "Error creating user",
    //             error: err.message
    //         });
    //     }
    // };

    // Get all users data from database
    getUser = async function(req, res) {
        try {
            let userData = await userModel.find();
            res.status(200).send({
                data: userData,
                message: "Data fetched successfully"
            });
        } catch (err) {
            res.status(500).send({
                message: "Error fetching data",
                error: err.message
            });
        }
    };

    // Add user to database
    addUser = async function(req, res) {
        try {
            req.body.password = new userModel().generateHash(req.body.password);
            let userData = new userModel(req.body);
            let saveData = await userData.save();
            res.status(200).send({
                data: saveData,
                message: "Data saved successfully"
            });
        } catch (err) {
            res.status(500).send({
                message: "Error saving data",
                error: err.message
            });
        }
    };

    // Update the data of the existing user 
    updateUser = async function(req, res) {
        try {
            console.log(req.body);
            let updatedUser = await userModel.findByIdAndUpdate(req.body.id, req.body);
            let userData = await userModel.findOne({_id: req.body.id});

            if (!updatedUser) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            res.status(200).send({
                data: userData,
                message: "Data updated successfully"
            });
        } catch (err) {
            res.status(500).send({
                message: "Error updating data",
                error: err.message
            });
        }
    };

    getSingleUser = async function (req,res) {
        try {
            let userData = await userModel.findOne({
                _id: req.params.id
            });

            res.status(200).send({
                data: userData,
                status: "Data fetched success"
            });
        } catch (err) {
            console.log(err)
            res.send({
                data: err,
                status: "Error"
            })
        }
    };

    // Delete a user from the database
    deleteUser = async function(req, res) {
        try {
            let reqData = {
                delete_status: true
            }
            
            const { id } = req.params;
            const deletedUser = await userModel.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            res.status(200).send({
                data: {},
                message: "User deleted successfully"
            });
        } catch (err) {
            res.status(500).send({
                message: "Error deleting user",
                error: err.message
            });
        }
    };

    login = async function(req, res) {
        try {
            //console.log(req.body);
    
            // Find the user by email
            let userData = await userModel.findOne({ 
                email: req.body.email 
            });
            console.log(userData);
    
            if (!userData) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
    
            // Validate password
            let User =  new userModel;
            let isValidPassword = await User.compareHash(req.body.password, userData.password);
    
            if (!isValidPassword) {
                return res.status(401).send({
                    message: "Password is Wrong!"
                });
            }
    
            // Create JWT token
            let payload = {
                id: userData._id,
                email: userData.email
            };
    
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "12H"
            });
    
            res.status(200).send({
                data: userData,
                message: "User logged in successfully",
                token: token,
                status: 200
            });
    
        } catch (err) {
            res.status(500).send({
                message: "Error logging in",
                error: err.message
            });
        }
    };

    signUp = async function (req, res) {
        try {
            
            let userData = await userModel.findOne({ 
                email: req.body.email 
            });
            // console.log(userData);
            let User =  new userModel;
    
            if (userData) {
                return res.status(401).send({
                    message: "USer Is already existing",
                });
            }
            req.body.password = new userModel().generateHash(req.body.password);
            let user_Data = new userModel(req.body);
            let saveData = await user_Data.save();
            res.status(200).send({
                data: saveData,
                message: "User Sign Up Successfully"
            });
        } catch (err) {
            res.status(500).send({
                message: "Error Signup",
                error: err.message
            });
        }
    };
}

module.exports = new ApiController();
