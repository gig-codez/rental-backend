import { Router } from "express";
import jwt from "jsonwebtoken";
import { default as fileUpload } from "../tools/fileUpload.mjs";
import { default as TenantController } from "../controllers/tenant.controller.mjs";
import LandlordController from "../controllers/landlord.controller.mjs";
import PropertyController from "../controllers/property.controller.mjs";
import ComplaintController from "../controllers/complaint.controller.mjs";
import PaymentController from "../controllers/payment.controller.mjs";

import ForgotPassword from "../auth/ForgotPassword.mjs";
const router = Router();
// posts



router.post("/create/property", PropertyController.createProperty);
router.post(
  "/create/complaint",
  fileUpload("/uploads/images"),
  ComplaintController.addComplaint
);
router.post("/create/payment", PaymentController.addPayment);

// forgot password
router.post('/forgotPassword', ForgotPassword.forgotPassword);
router.post('/changePassword', TenantController.changePassword);

export default router;
