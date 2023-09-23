import PropertyModel from "../models/property.model.mjs";
class PropertyController {
  static createProperty = async (req, res) => {
    try {
      // first check if it exists
      const oldProperty = await PropertyModel.findOne({
        name: req.body.name,
        address: req.body.address,
        floors: req.body.floors,
      });
      if (oldProperty) {
        res.status(400).json({ message: "Property already exists!" });
      } else {
        const property = new PropertyModel({
          name: req.body.name,
          address: req.body.address,
          floors: req.body.floors,
          landlord: req.body.landlord,
          
        });
       await property.save();
        res.status(201).json({ message: property });
      }
     
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to get all properties
  static fetchAllProperties = async (req, res) => {
    try {
      const properties = await PropertyModel.find();
      res.status(200).json({ properties });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // function to delete a property
  static deleteProperty = async (req, res) => {
    try {
      const property = await PropertyModel.findByIdAndDelete(req.params.id);
      if (property) {
        res.status(200).json({ message: "Property deleted successfully" });
      } else {
        res.status(400).json({ message: "Property not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  //function to update property
  static updateProperty = async (req, res) => {
    try {
      const oldPropertyRecord = await PropertyModel.findById(req.params.id);
      if (oldPropertyRecord) {
        const updatedPropertyRecord = await PropertyModel.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name,
            address: req.body.address,
            floors: req.body.floors,
            landlord: req.body.landlord,
      
          },
          { new: true }
        );
        res.status(200).json({ message: updatedPropertyRecord });
      } else {
        res.status(400).json({ message: "Property not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default PropertyController;
