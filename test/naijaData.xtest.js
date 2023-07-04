const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
require("dotenv").config();


const apiKey = process.env.SAMPLE_API_KEY;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })


})

afterAll(async () => {
    await mongoose.connection.close()
    await mongoose.disconnect()
})

describe("Authenticated Naija Bio-data Endpoints", () => {
    describe("returns regions,state, lgas and their metadata", () => {
        it("should return the data, when user sign in and use their Api Key as a query parama", async () => {
            const { body, statusCode } = await request(app)
                .set("Authorisation", `Bearer ${apiKey}`)
                .get(`/api/v1/search`)


            expect(statusCode).toBe(200)
            expect(body).toBeDefined()

        });

        it("should return an array containing all region names in Nigeria", async () => {
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/regions`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
            expect(body).toEqual([
                "South West",
                "North Central",
                "North East",
                "South East",
                "North West",
                "South South"
            ]);
        });

        it("should return an array containing the names of all states in Nigeria", async () => {
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/states`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
            expect(body).toEqual([
                "Ekiti",
                "Lagos",
                "Ogun",
                "Ondo",
                "Osun",
                "Oyo",
                "Federal Capital Territory",
                "Benue",
                "Kogi",
                "Kwara",
                "Nasarawa",
                "Niger",
                "Plateau",
                "Adamawa",
                "Bauchi",
                "Borno",
                "Gombe",
                "Taraba",
                "Yobe",
                "Abia",
                "Anambra",
                "Ebonyi",
                "Enugu",
                "Imo",
                "Jigawa",
                "Kaduna",
                "Kano",
                "Katsina",
                "Kebbi",
                "Sokoto",
                "Zamfara",
                "Akwa Ibom",
                "Bayelsa",
                "Cross River",
                "Delta",
                "Edo",
                "Rivers"
            ]);
        });

        it("should return states grouped by the region they are in Nigeria", async () => {
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/region-states`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
        });

        it("should return local govt. areas grouped by their states in Nigeria", async () => {
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/state-lgas`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
        });

        it("should return all states alongside, all their lgas, and metadata", async () => {
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/state-data`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
        });

        it("requires a path parameter of a Region Name and returns all states alongside, all their lgas, and metadata in the selected region", async () => {
            const regionName = "South South"
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/regions/${regionName}`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
        });

        it("requires a path parameter of a State Name and returns all their lgas, and metadata in the selected state", async () => {
            const stateName = "Lagos"
            const { body, statusCode } = await request(app)
                .get(`/api/v1/search/states/${stateName}`)
                .set("Authorization", `Bearer ${apiKey}`)

            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
        });
    })
})