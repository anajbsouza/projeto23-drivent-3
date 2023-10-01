import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    try {
        const hotels = await hotelsService.getHotels(userId);
        return res.send(hotels);
    } catch(err) {

    }
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const hotelId = req.params;
    try {
        const hotel = await hotelsService.getHotelsWithRooms(userId, hotelId)
    } catch(err) {

    }
}