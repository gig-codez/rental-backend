import UsersModel from "../models/users.model.mjs";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

class UserLogin{
    static  loginUser = async (req, res) =>{
        try {
            const { username, password } = req.body;
            const user = await UsersModel.findOne({
                username: req.body.username
            });
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Password failed' });
            }
            const token = jwt.sign({ userId: user._id },
                process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({ token }); //TODO - return the firstname , lastname , phone number , DP, and email of the user logged in
        } catch (error) {
            res.status(500).json({ error: 'Authentication failed' });
        }
    }

}

export default UserLogin;