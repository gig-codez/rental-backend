import SendMail from "../helpers/SendMail.mjs";
import tenantsModel from "../models/tenants.model.mjs";
import landlordModel from "../models/landlord.model.mjs";
import bcrypt from "bcrypt";
class TenantController {
  static createTenant = async (req, res) => {

    try {
      // First, check if a tenant with the same name, property_id, and landlord_id exists
      const oldTenantRecord = await tenantsModel.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          if (!oldTenantRecord) {
            // If the tenant does not exist, create a new one
            const tenantPayload = new tenantsModel({
              name: req.body.name,
              address: req.body.address,
              email: req.body.email,
              phone: req.body.phone,
              password: hash,
              profile:  req.file ? req.file.originalname: "default.png",
              property: req.body.property,
              landlord: req.body.landlord,
              monthly_rent: req.body.monthly_rent,
              power_fee: req.body.power_fee,
              power_status: req.body.power_status,
              otp: req.body.otp,
              fcm_token: req.body.fcm_token,
              isEmailVerified: req.body.isEmailVerified
            });
            var landlord =  landlordModel.findById(req.body.landlord);
            await tenantPayload.save();
            SendMail.sendMail({
              from: `${landlord.email}`, // sender address
              to: req.body.email, // list of receivers
              subject: "Account created ✔", // Subject line
              html: `
              <div>
                <p>Hi, ${req.body.name}! Your account has been created successfully</p>
                <p>Your login details are:</p>
                <p>Username: ${req.body.email}</p>
                <p>Password: ${req.body.password}</p>
                <p>Download the app from the following link:\n
                <a href='https://play.google.com/store/apps/details?id=x.a.zix'>
                  <img src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width='200' height='100'/>
                </a>
                </p>
                <br/>
                <p>Regards,</p>
                <p>Thank you for choosing us!</p>
              </div>
              `,
            },res)
            res.status(200).send(tenantPayload);
          } else {
            res.status(400).json({ message: "Tenant already exists!" });
          }
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // get all landlords
  static fetchAllTenants = async (req, res) => {
    try {
      // Find all tenants using the Tenant model
      const tenants = await tenantsModel.find().populate('property');
      res.status(200).send(tenants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
   // get all landlords
   static fetchLandlordTenants = async (req, res) => {
    try {
      // Find all tenants using the Tenant model
      const tenants = await tenantsModel.find().where({landlord:req.params.id}).populate('property');
      res.status(200).send(tenants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to delete a tenant
  static deleteTenant = async (req, res) => {
    try {
      // Find the tenant using the Tenant model
      const tenant = await tenantsModel.findByIdAndDelete(req.params.id);
      if (tenant) {
        res.status(200).json({ message: "Tenant deleted successfully" });
      } else {
        res.status(400).json({ message: "Tenant not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to update a tenant
  static updateTenant = async (req, res) => {
    try {
      // Find the tenant using the Tenant model
      const oldTenantRecord = await tenantsModel.findById(req.params.id);
      if (oldTenantRecord) {
        // Update the tenant record
        const updatedTenantRecord = await tenantsModel.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name != "" ? req.body.name : oldTenantRecord.name,
            address:
              req.body.address != ""
                ? req.body.address
                : oldTenantRecord.address,
            email:
              req.body.email != "" ? req.body.email : oldTenantRecord.email,
            phone:
              req.body.phone != "" ? req.body.phone : oldTenantRecord.phone,
            password:
              req.body.password != ""
                ? bcrypt.hashSync(req.body.password, 10)
                : oldTenantRecord.password,
            profile: req.file ? req.file.originalname : oldTenantRecord.profile,
            property: oldTenantRecord.property,
            landlord: oldTenantRecord.landlord,
            power_fee:
              req.body.power_fee != ""
                ? req.body.power_fee
                : oldTenantRecord.power_fee,
            monthly_rent:
              req.body.monthly_rent != ""
                ? req.body.monthly_rent
                : oldTenantRecord.monthly_rent,
            power_status:
              req.body.power_status != ""
                ? req.body.power_status
                : oldTenantRecord.power_status,
          },
          { new: true }
        );
        res
          .status(200)
          .json({
            message: `${updatedTenantRecord.name} updated successfully`,
          });
      } else {
        res.status(400).json({ message: "Tenant not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // fetch specific tenant
  static fetchTenant = async (req, res) => {
    try {
      const tenant = await tenantsModel.findById(req.params.id).populate('property');
      if (tenant) {
        res.status(200).json(tenant);
      } else {
        res.status(400).json({ message: "Tenant not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // function to change user password
 static changePassword = async (req, res) => {
    try {
      const { userId, password } = req.body;
      // Find the user by id
      const user = await tenantsModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
      // Check if the old password matches the stored password
      // const isMatch = await bcrypt.compare(password, user.password);
      // console.log(user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ message: "Invalid old password" });
      // }
      // Encrypt the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Password updated successfully" })
            }
      
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}
export default TenantController;
