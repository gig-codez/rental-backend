import Tenant from "../models/tenants.model.mjs";

class TenantController {
  static createTenant = async (req, res) => {
    const { name, address, email, phone, password, property_id, landlord_id } = req.body;
    let profile_img = "";

    // check if image is uploaded via file
    if (req.file) {
      profile_img = req.file.originalname;
    } else {
      profile_img = "default.png";
    }

    try {
      // First, check if a tenant with the same name, property_id, and landlord_id exists
      const oldTenantRecord = await Tenant.findOne({ name, property: property_id, landlord: landlord_id });

      if (!oldTenantRecord) {
        // If the tenant does not exist, create a new one
        const tenantPayload = new Tenant({
          name,
          address,
          email,
          phone,
          password,
          profile: profile_img,
          property: property_id,
          landlord: landlord_id,
        });

        await tenantPayload.save();
        res.status(200).send(tenantPayload);
      } else {
        res.status(400).send("Tenant already exists!");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// get all landlords
  static fetchAllTenants = async (req, res) => {
    try {
      // Find all tenants using the Tenant model
      const tenants = await Tenant.find();
      res.status(200).send(tenants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default TenantController;
