import express from "express";
import {
  urlShortener,
  urlRedirectByID,
} from "../controllers/urlShortnerController";

const router = express.Router();

router.post("/urlshort", urlShortener);
router.get("/urlshort/:code", urlRedirectByID);

export default router;
