import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotels, getHotelsWithRooms } from "@/controllers/hotels-controller";

const hotelsRouter = Router();

hotelsRouter
    .all("/*", authenticateToken)
    .get("/hotels", getHotels)
    .get("/hotels/:hotelId", getHotelsWithRooms)

export { hotelsRouter };
