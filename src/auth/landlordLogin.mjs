import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import landlordModel from "../models/landlord.model.mjs";
import axios from "axios";
class LandlordLogin {
  static landlordLogin = async (req, res) => {
    try {
      // first check if a landlord with the same name exists
      const landlord = await landlordModel.findOne({
        email: req.body.email,
      });
      if (landlord) {
        let token = jwt.sign(
          { email: landlord.email, _id: landlord._id },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        //    compare encrypted password
        bcrypt.compare(
          req.body.password,
          landlord.password,
          async (err, result) => {
            if (result) {
              jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                  return res.status(401).json({ message: "Invalid token" });
                } else {
                  axios.patch(`http://${process.env.HOST_URL}:4045/update/updateLandlord/${landlord._id}`, {
                    "fcm_token": req.body.fcm_token
                  });
                  res.status(200).json({
                    message: "Login successful",
                    data: {
                      userId: landlord._id,
                      landlordId: landlord.landlord,
                      token: token,
                      email: landlord.email,
                      name: landlord.name,
                    },
                  });
                }
              });
            } else {
              res.status(400).json({ message: "Invalid password" });
            }
          }
        );
      } else {
        res.status(400).json({ message: `${req.body.email} does not exist` });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default LandlordLogin;
