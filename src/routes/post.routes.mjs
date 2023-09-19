import { Router } from "express";
import jwt from "jsonwebtoken";
import { default as fileUpload } from "../tools/fileUpload.mjs";
import { default as TenantController } from "../controllers/tenant.controller.mjs";
const router = Router();
// posts
router.post(
  "/create/tenant",
  fileUpload("/uploads/images"),
  TenantController.createTenant
);
export default router;
