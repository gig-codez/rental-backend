import ComplaintModel from "../models/complaint.model.mjs";
import tenantsModel from "../models/tenants.model.mjs";
class ComplaintController{
    // function to add complaints
    static addComplaint = async (req, res) => {
        try {
            const oldComplaint = await ComplaintModel.findOne({ complaint_name: req.body.name });
            // check if a complaint with the same name exists
            if (oldComplaint) {
                res.status(400).json({ message: "Complaint already exists!" });
            } else { 
                const complaint = new ComplaintModel({
                    tenant: req.body.tenant,
                    property: req.body.property,
                    reason: req.body.reason,
                    complaint_name: req.body.name,
                    complaint_description: req.body.description,
                    complaint_status: req.body.status,
                    
                    complaint_image: req.file ? req.file.originalname : "default.png",
                });
               await complaint.save();
            res.status(200).json({ message:"Complaint added successfully" });
        }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // function to fetch all complaints
    static fetchAllComplaints = async (req, res) => {
        try {
            const complaints = await ComplaintModel.find();
            res.status(200).json(complaints);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static fetchTenantComplaints = async(req, res) => {
        try {
            var tenant = await tenantsModel.findOne({ _id: req.params.id });
            if (tenant) {
                let complaints = await ComplaintModel.find({}).where({ tenant: req.params.id });
                res.status(200).json(complaints);
            } else {
                res.status(400).json({ message: "Tenant not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // function to delete a complaint
    static deleteComplaint = async (req, res) => {
        try {
            const complaint = await ComplaintModel.findByIdAndDelete(req.params.id);
            if (complaint) {
                res.status(200).json({ message: "Complaint deleted successfully" });
            } else {
                res.status(400).json({ message: "Complaint not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // function to update complaint
    static updateComplaint = async (req, res) => {
        try {
            const oldComplaintRecord = await ComplaintModel.findById(req.params.id);
            if (oldComplaintRecord) {
                const updatedComplaintRecord = await ComplaintModel.findByIdAndUpdate(
                    req.params.id,
                    {   
                        complaint_name: req.body.name !== "" ? req.body.name : oldComplaintRecord.complaint_name,
                        complaint_description: req.body.description !== "" ? req.body.description : oldComplaintRecord.complaint_description,
                        complaint_status: req.body.status !== "" ? req.body.status : oldComplaintRecord.complaint_status,
                        reason: req.body.reason !== "" ? req.body.reason : oldComplaintRecord.reason,
                        complaint_image:req.file?req.file.originalname:oldComplaintRecord.complaint_image,
                    },
                    { new: true }
                );
                res.status(200).json({ message: updatedComplaintRecord });
            } else {
                res.status(400).json({ message: "Complaint not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default ComplaintController;