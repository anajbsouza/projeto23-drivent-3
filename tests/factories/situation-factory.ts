import { TicketStatus } from "@prisma/client";
import { createUser, createEnrollmentWithAddress, createTicketWithType, createTicket, createPayment } from "../factories";
import { generateValidToken } from "../helpers";
import app from "@/app";
import supertest from "supertest";

const server = supertest(app);

export async function createSituation() {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketWithType(true);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    
    return {
        user,
        token,
        enrollment,
        ticketType,
        ticket,
    };
}