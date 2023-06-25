const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
require("dotenv").config();


const apiKey = process.env.SAMPLE_API_KEY;

beforeAll( async function(){
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true
    })

            
})

afterAll( async function(){
    await mongoose.connection.close()
    await mongoose.disconnect()
})

describe("Authenticated Naija Bio-data Endpoints", ()=>{
    describe("returns regions,state, lgas and their metadata", ()=>{
        it("should return the data, when user sign in and use their Api Key as a query parama", async()=>{
         const {body, statusCode} = await request(app)
         .set("Authorisation", `Bearer ${apiKey}`)
         .get(`/api/v1/search`)
         

         expect(statusCode).toBe(200)
         expect(body).toBeDefined()
         
        })
    })
})