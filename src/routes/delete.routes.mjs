import { Router } from 'express';
import LandlordController from '../controllers/landlord.controller.mjs';
import TenantController from '../controllers/tenant.controller.mjs';
import PropertyController from '../controllers/property.controller.mjs';
import ComplaintController from '../controllers/complaint.controller.mjs';
import PaymentController from '../controllers/payment.controller.mjs';
const router = Router();

router.delete("/deleteLandlord/:id", LandlordController.deleteLandlord);
router.delete('/deleteTenant/:id', TenantController.deleteTenant);
router.delete('/deleteProperty/:id', PropertyController.deleteProperty);
router.delete('/deleteComplaint/:id', ComplaintController.deleteComplaint);
router.delete('/deletePayment/:id', PaymentController.deletePayment);

export default router;