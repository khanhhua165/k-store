import { findAllTypes } from "./../controllers/productTypeController";
import { Router } from "express";

const router = Router();

router.get("/types", findAllTypes);

export default router;
