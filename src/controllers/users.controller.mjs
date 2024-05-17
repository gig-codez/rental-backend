import UsersModel from "../models/users.model.mjs";
import sendEmailController from "./sendEmail.controller.mjs";
import bcrypt from "bcrypt";

class UsersController {
    static createUser = async (req, res) => {

        try {
            // first check if a user with the same username and email exists
            const existingUser = await UsersModel.findOne({
                username: req.body.username,
                email: req.body.email,
            });
            if(req.body.password){
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) {
                        res.status(500).json({message: err.message});
                    } else {
                        await createUser(existingUser, req, res) // call function to create user after hashing
                    }
                })
            }else{
                await createUser(existingUser, req, res) // call function to create user without hashing , no password
            }


        } catch (err) {
            res.status(500).json({message: err.message});
        }
    };
}

const createUser = async (existingUser, req, res) =>{
    if (!existingUser) {
        // If the user does not exist, create a new one
        const newUserPayload = new UsersModel({
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // Conditionally include the password field if it exists in the request body
            ...(req.body.password && { password: req.body.password })
        });
        await newUserPayload.save();
        // if password was not in the request, send the user an email to create their own password
        sendEmailController.sendEmail(req.body.email, req.body.firstName)
        res.status(200).json(newUserPayload);
    } else {
        res.status(400).json({message: "User with same username and email already exists!"});
    }
}
export default UsersController;