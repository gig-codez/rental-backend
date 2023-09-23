import tenantsModel from "../models/tenants.model.mjs";
import bcrypt from "bcrypt";
class TenantController {
  static createTenant = async (req, res) => {
    // const { name, address, email, phone, password, property_id, landlord_id } = req.body;
    let profile_img = "";

    // check if image is uploaded via file
    if (req.file) {
      profile_img = req.file.originalname;
    } else {
      profile_img = "default.png";
    }

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
              profile: profile_img,
              property: req.body.property,
              landlord: req.body.landlord,
              monthly_rent: req.body.monthly_rent,
              power_fee: req.body.power_fee,
              power_status: req.body.power_status,
              otp: req.body.otp,
              fcm_token: req.body.fcm_token,
              isEmailVerified: req.body.isEmailVerified
            });

            await tenantPayload.save();
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
      const tenants = await tenantsModel.find();
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
      const tenant = await tenantsModel.findById(req.params.id);
      if (tenant) {
        res.status(200).json(tenant);
      } else {
        res.status(400).json({ message: "Tenant not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default TenantController;
