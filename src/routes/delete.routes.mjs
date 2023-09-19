import { Router } from 'express';
import LandlordController from '../controllers/landlord.controller.mjs';
const router = Router();
router.delete("/deleteLandlord/:id", LandlordController.deleteLandlord)
export default router;