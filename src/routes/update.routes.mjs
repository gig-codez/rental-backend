import { Router } from "express";
import LandlordController from "../controllers/landlord.controller.mjs";
import fileUpload from "../tools/fileUpload.mjs";
import TenantController from "../controllers/tenant.controller.mjs";
import PropertyController from "../controllers/property.controller.mjs";
import ComplaintController from "../controllers/complaint.controller.mjs";
import PaymentController from "../controllers/payment.controller.mjs";
const router = Router();
router.patch(
  "/updateLandlord/:id",
  fileUpload("/uploads/images"),
  LandlordController.updateLandlord
);
router.patch(
  "/updateTenant/:id",
  fileUpload("/uploads/images"),
  TenantController.updateTenant
);
router.patch("/updateProperty/:id", PropertyController.updateProperty);
router.patch("/updateComplaint/:id", ComplaintController.updateComplaint);
router.patch("/updatePayment/:id",PaymentController.updatePayment);
export default router;
