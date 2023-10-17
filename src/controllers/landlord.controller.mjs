import landlordModel from "../models/landlord.model.mjs";
import bcrypt from "bcrypt";
class LandlordController {
  static createLandlord = async (req, res) => {
    let profile_img = "";
    try {
      if (req.file) {
        profile_img = req.file.originalname;
      } else {
        profile_img = `default.png`;
      }
     
      // first check if a landlord with the same name exists
      const oldLandlordRecord = await landlordModel.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          if (!oldLandlordRecord) {

            // If the landlord does not exist, create a new one
            const landlordPayload = new landlordModel({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              profile: profile_img,
              fcm_token: req.body.fcm_token
            });
            await landlordPayload.save();
            res.status(200).send(landlordPayload);
          } else {
            res.status(400).send("Landlord already exists!");
          }
        }
      })
      
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
          profile_img = req.file.originalname;
        } else {
          profile_img = oldLandlordRecord.profile;
        }
        const landlord = await landlordModel.findByIdAndUpdate(
          req.params.id,
            {
              name: req.body.name == "" ? oldLandlordRecord.name:req.body.name,
              email: req.body.email == "" ? oldLandlordRecord.name:req.body.name,
              password: req.body.password == "" ? oldLandlordRecord.name:req.body.name,
              profile: profile_img,
              fcm_token:req.body.fcm_token == "" ? oldLandlordRecord.fcm_token:req.body.fcm_token
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
