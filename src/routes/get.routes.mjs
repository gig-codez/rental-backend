import { Router } from 'express'
import TenantController from '../controllers/tenant.controller.mjs';
import LandlordController from '../controllers/landlord.controller.mjs';
const router = Router();
router.get('/tenants', TenantController.fetchAllTenants);
router.get('/landlords', LandlordController.fetchAllLandlords);
export default router;