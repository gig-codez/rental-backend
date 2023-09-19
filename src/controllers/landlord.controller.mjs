import landlordModel from "../models/landlord.model.mjs";

class LandlordController {
  static createLandlord = async (req, res) => {
    let profile_img = "";
    try {
      if (req.file) {
        console.log(req.file);
        profile_img = req.file.path;
      } else {
        profile_img = `uploads/default.png`;
      }
      const landlordPayload = new landlordModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile: profile_img,
      });
      // first check if a landlord with the same name exists
      const oldLandlordRecord = await landlordModel.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      if (!oldLandlordRecord) {
        await landlordPayload.save();
        res.status(200).send(landlordPayload);
      } else {
        res.status(400).send("Landlord already exists!");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // get all landlords
  static fetchAllLandlords = async (req, res) => {
    try {
      const landlords = await landlordModel.find();
      res.status(200).json({ landlords });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // delete landlord
  static deleteLandlord = async (req, res) => {
    try {
      const landlord = await landlordModel.findByIdAndDelete(req.params.id);
      if (landlord) {
        res
          .status(200)
          .json({ message: `${landlord.name} deleted successfully` });
      } else {
        res.status(404).json({ message: "Landlord not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // update landlord details
    static updateLandlord = async (req, res) => {
      let profile_img = "";
    try {
        const oldLandlordRecord = await landlordModel.findById(req.params.id);

        console.log(oldLandlordRecord);
      if (oldLandlordRecord) {
        if (req.file) {
          profile_img = req.file.path;
        } else {
          profile_img = oldLandlordRecord.profile;
        }
        const landlord = await landlordModel.findByIdAndUpdate(
          req.params.id,
            {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              profile: profile_img,
          },
          {
            new: true,
          }
        );
       
          res
            .status(200)
            .json({ message: `${landlord.name} updated successfully` });
        
      } else {
        res.status(404).json({ message: "Landlord not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default LandlordController;
