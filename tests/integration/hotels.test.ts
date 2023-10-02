import app, { init } from "@/app";
import { createUser } from "../../tests/factories/users-factory";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import faker from "@faker-js/faker";
import * as jwt from 'jsonwebtoken';
import { createEnrollmentWithAddress, createTicketWithType, createTicket, createPayment } from "../factories";
import { TicketStatus } from "@prisma/client";
import { createSituation } from "../factories/situation-factory";
import { createHotel } from "../factories/hotel-factory";

const server = supertest(app);

beforeAll( async () => {
    await init();
})

beforeEach( async () => {
    await cleanDb();
})

describe("GET /hotels", () => {
    // casos em que autenticação falhou
    it("should respond with status 401 if no token is given", async () => {
        const { status } = await server.get("/hotels").set("Authorization", `Bearer token inválido`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const { status } = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const { status } = await server.get("/hotels").set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    // casos em que autenticação deu sucesso
    it("should respond with status 404 when user has no enrollment", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const { status } = await server.get("/hotels").set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user ticket is remote", async () => {
        // const situation = await createSituation();
        // const { status } = await server.get('/hotels').set('Authorization', `Bearer ${situation.token}`);
        // expect(status).toEqual(httpStatus.PAYMENT_REQUIRED);

    });

    it("should respond with status 200 and a list of hotels", async () => {
        // const situation = await createSituation();
        // const { status, body } = await server.get('/hotels').set('Authorization', `Bearer ${situation.token}`);
        // const hotel = await createHotel();

        // expect(status).toEqual(httpStatus.OK);

        // expect(body).toEqual([
        //     {
        //     id: hotel.id,
        //     name: hotel.name,
        //     image: hotel.image,
        //     createdAt: hotel.createdAt.toISOString(),
        //     updatedAt: hotel.updatedAt.toISOString(),
        //     },
        // ]);
    });

    it("should respond with status 200 and an empty array", async () => {
        // const situation = await createSituation();
        // const { status, body } = await server.get('/hotels').set('Authorization', `Bearer ${situation.token}`);
        // expect(status).toEqual(httpStatus.OK);
        // expect(body).toEqual([]);
    });

});

describe("GET /hotels/:id", () => {
    it("should respond with status 401 if no token is given", async () => {
        const { status } = await server.get("/hotels").set("Authorization", `Bearer token inválido`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const { status } = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const { status } = await server.get("/hotels").set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("", async () => {
        
    });

    it("", async () => {
        
    });

    it("", async () => {
        
    });
});