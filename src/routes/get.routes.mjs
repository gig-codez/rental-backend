import { Router } from "express";
import TenantController from "../controllers/tenant.controller.mjs";
import LandlordController from "../controllers/landlord.controller.mjs";
import PaymentController from "../controllers/payment.controller.mjs";
import PropertyController from "../controllers/property.controller.mjs";
import ComplaintController from "../controllers/complaint.controller.mjs";
const router = Router();
router.get("/tenants", TenantController.fetchAllTenants);
router.get("/landlords", LandlordController.fetchAllLandlords);
router.get("/payments/:id", PaymentController.getAllPayments);
router.get("/lastPayment/:id", PaymentController.getLastPayment);
router.get("/property", PropertyController.fetchAllProperties);
router.get("/complaints", ComplaintController.fetchAllComplaints);
router.get("/tenantComplaints/:id", ComplaintController.fetchTenantComplaints);
// router.get('')
export default router;
