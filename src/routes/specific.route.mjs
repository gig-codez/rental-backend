import { Router } from "express";
import TenantController from "../controllers/tenant.controller.mjs";

const router = Router();
// specific tenant
router.get('/specificTenant/:id', TenantController.fetchTenant);
export default router;