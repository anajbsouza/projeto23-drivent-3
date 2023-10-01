import { notFoundError } from "@/errors";
import { cannotGetHotelsErrors } from "@/errors/cannot-get-hotels-error";
import { enrollmentRepository, ticketsRepository } from "@/repositories";
import { hotelRepository } from "@/repositories/hotels-repository";


async function getHotels(userId: number) {
    await canGetHotels(userId);
    const hotels = await hotelRepository.getHotels();
    return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
    await canGetHotels(userId);
    const hotels = await hotelRepository.getHotelsWithRooms(hotelId);
    return hotels;
}

async function canGetHotels(userId: number) {
    const enrollment = enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId((await enrollment).id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotGetHotelsErrors();
    }
}

export default { getHotels, getHotelsWithRooms };

