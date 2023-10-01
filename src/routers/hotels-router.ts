import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter
    .all("/*", authenticateToken)
    .get("/hotels")
    .get("/hotels/:hotelId")

export { hotelsRouter };
