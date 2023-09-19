import { Router } from "express";
import LandlordController from "../controllers/landlord.controller.mjs";
import fileUpload from "../tools/fileUpload.mjs";
const router = Router();
router.patch("/updateLandlord/:id",fileUpload('/uploads/images'), LandlordController.updateLandlord);
export default router;
