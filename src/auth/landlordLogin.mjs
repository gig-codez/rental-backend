import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import landlordModel from "../models/landlord.model.mjs";
class LandlordLogin {
  static landlordLogin = async (req, res) => {
    try {
      // first check if a landlord with the same name exists
      const landlord = await landlordModel.findOne({
        email: req.body.email,
      });
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
                if (landlord) {
                  res.status(200).json({
                    userId: landlord._id,
                    landlordId: landlord.landlord,
                    token: token,
                    email: landlord.email,
                    name: landlord.name,
                  });
                } else {
                  res
                    .status(400)
                    .json({ message: `${req.body.email} does not exist` });
                }
              }
              //   console.log(decoded);
            });
          } else {
            res.status(400).json({ message: "Invalid password" });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default LandlordLogin;
