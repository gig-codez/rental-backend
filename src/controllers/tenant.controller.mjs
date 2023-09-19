import Tenant from "../models/tenants.model.mjs";
class TenantController {
  static createTenant = async (req, res) => {
    const { name, address, email, phone, password, property_id, landlord_id } =
      req.body;
    let profile_img = "";
    //  check if image is uploaded via file
    if (req.file) {
      profile_img = req.file.originalname;
    } else {
      profile_img = "default.png";
    }
    // -------------------------
    try {
      const tenantPayload = new Tenant({
        name: name,
        address: address,
        email: email,
        phone: phone,
        password: password,
        profile: profile_img,
        property: property_id,
        landlord: landlord_id,
      });
      // first check if tenant already exists
      let oldTenantRecord = await Tenant.findOne({
        name: name,
        property: property_id,
        landlord: landlord_id,
      });
      // console.log(oldClass)
      if (!oldTenantRecord) {
        tenantPayload.save();
        res.status(200).send(tenantPayload);
      } else {
        res.status(400).send("Tenant already exists!");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to fetch all tenants
  static fetchAllTenants = async (req, res) => {
    try {
      const tenants = await Tenant.find();
      res.status(200).send(tenants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default TenantController;
