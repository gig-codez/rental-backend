import ComplaintModel from "../models/complaint.model.mjs";
class ComplaintController{
    // function to add complaints
    static addComplaint = async (req, res) => {
        try {
            const complaint = new ComplaintModel({
                complaint_name: req.body.name,
                complaint_description: req.body.description,
                complaint_status: req.body.status,
                complaint_date: req.body.date,
                complaint_image:req.file?req.file.originalname:"default.png",
            });
            res.status(200).json({ message: complaint });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // function to fetch all complaints
    static fetchAllComplaints = async (req, res) => {
        try {
            const complaints = await ComplaintModel.find();
            res.status(200).json({ complaints });
        } catch (err) {
            res.status(500).json({ message: err.message });
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
                        complaint_name: req.body.name,
                        complaint_description: req.body.description,
                        complaint_status: req.body.status,
                        complaint_date: req.body.date,
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