import { Router } from 'express'
import TenantController from '../controllers/tenant.controller.mjs';
const router = Router();
router.get('/tenants',TenantController.fetchAllTenants);
export default router;