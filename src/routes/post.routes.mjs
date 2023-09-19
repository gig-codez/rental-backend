import { Router } from "express";
import jwt from "jsonwebtoken";
import { default as fileUpload } from "../tools/fileUpload.mjs";
import { default as TenantController } from "../controllers/tenant.controller.mjs";
import LandlordController from "../controllers/landlord.controller.mjs";
import PropertyController from "../controllers/property.controller.mjs";
import ComplaintController from "../controllers/complaint.controller.mjs";
import PaymentController from "../controllers/payment.controller.mjs";
const router = Router();
// posts
router.post(
  "/create/tenant",
  fileUpload("/uploads/images"),
  TenantController.createTenant
);

router.post(
  "/create/landlord",
  fileUpload("/uploads"),
  LandlordController.createLandlord
);

router.post("/create/property", PropertyController.createProperty);
router.post("/create/complaint", ComplaintController.addComplaint);
router.post("/create/payment", PaymentController.addPayment);
// router.post('')
export default router;
