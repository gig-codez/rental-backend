import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import tenantModel from "../models/tenants.model.mjs";
import { updateTenantFCMToken } from "../helpers/helperfunctions.mjs";
class TenantLogin {
  static tenantLogin = async (req, res) => {
    try {
      console.log(req.body)
      // first check if a landlord with the same name exists
      const tenant = await tenantModel.findOne({
        email: req.body.email,
      });
      let token = jwt.sign(
        { email: tenant.email, _id: tenant._id },
        process.env.SECRET_KEY,
        { expiresIn: "5m" }
      );
      //    compare encrypted password
      bcrypt.compare(
        req.body.password,
        tenant.password,
        async (err, result) => {
         
          if (result) {
            // user account found
            // update user fcm token
            // updateTenantFCMToken
            // updateTenantFCMToken(tenant._id, req.body.fcm_token);
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
              if (err) {
                return res.status(401).json({ message: "Invalid token" });
              } else {
                if (tenant) {
                  res.status(200).json({
                    userId: tenant._id,
                    landlordId: tenant.landlord,
                    token: token,
                    email: tenant.email,
                    name: tenant.name,
                    rent: tenant.monthly_rent,
                    property:tenant.property
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

export default TenantLogin;
