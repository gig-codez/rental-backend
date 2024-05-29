import { Router } from "express";

import TenantLogin from "../../auth/tenantLogin.mjs";
import LandlordLogin from "../../auth/landlordLogin.mjs";
import fileUpload from "../../tools/fileUpload.mjs";
import TenantController from "../../controllers/tenant.controller.mjs";
import LandlordController from "../../controllers/landlord.controller.mjs";
import UsersController from "../../controllers/users.controller.mjs";
const router = Router();

// login
router.post("/login/tenant", TenantLogin.tenantLogin);
router.post("/login/landlord", LandlordLogin.landlordLogin);
// create account
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

router.post("/create/user",UsersController.createUser);

router.get("/setPassword", UsersController.setPasswordPage);
export default router;
