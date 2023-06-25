const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } =  require("mongodb-memory-server")
const mongoose = require('mongoose');
const { updateOne } = require("../model/auth.model");

//registeration payload
const userPayload = {
    "username": "test1",
    "email": "test1@xyz.com",
    "password": "1234567"
}

//signin payload 
const signInPayload = {
    "email": "test1@xyz.com",
    "password": "1234567"
}

/* Connecting to the database before each test. */
beforeAll( async function(){
    const mongod =  await MongoMemoryServer.create()
    await mongoose.connect(mongod.getUri(),{ useNewUrlParser: true
    })
  })

afterAll( async function(){
    await mongoose.connection.close();
    await mongoose.disconnect()
  })


describe("User Authentication", () =>{
    describe("New User registers enters details and application saves in the database", () =>{
        it("should return an Api Key for the registered user", async()=>{
            const {body, statusCode} = await request(app)
            .post("/api/v1/auth/register")
            .send(userPayload);

            expect(statusCode).toBe(201)
            expect(body).toHaveProperty('message', 'Registration completed!!!, Make sure you keep your API KEY Safe!')
            expect(body).toHaveProperty('user')
            expect(body.user).toHaveProperty('id')
            expect(body.user).toHaveProperty('username', 'test1')
            expect(body.user).toHaveProperty('email', 'test1@xyz.com')
            expect(body.user).toHaveProperty('apiKey')
        });
       
        it("should fail if the user doesn't fill all the required fields", async() =>{
            const inCompleteEntry = {...userPayload};
            delete inCompleteEntry.email
            const { body, statusCode} = await request(app)
            .post("/api/v1/auth/register")
            .send(inCompleteEntry)

            expect(statusCode).toBe(400)
            expect(body).toHaveProperty("message", "incomplete details, fill in all your details")
        });

        it("should fail if the user provides an email already registered in the database", async() =>{
            const duplicateEmail = {...userPayload};
            const { body, statusCode} = await request(app)
            .post("/api/v1/auth/register")
            .send(duplicateEmail)

            expect(statusCode).toBe(401)
            expect(body).toHaveProperty("message", "Email already Exist, Please try with a new email")
        });

    });
   
    //SIGN IN
    describe("Signs in an Existing User", ()=>{
        it('should signIn an existing user, when they provide their valid email and password', async()=>{
            const {body, statusCode} = await request(app)
            .post("/api/v1/auth/login")
            .send(signInPayload);

            expect(statusCode).toBe(200)
            expect(body).toHaveProperty("success", true)
            expect(body).toHaveProperty("message", "login Successful")
        });

        it("should fail if user omits the email or the passowrd field", () =>{
            const incompletePayload = {...signInPayload}
            delete incompletePayload.email
            const { body, statusCode} = request(app)
            .post("/api/v1/auth/login")
            send(incompletePayload)

            expect(statusCode).toBe(400)
            expect(body).toHaveProperty("message", "incomplete details, enter all fields")
        })

        it("should fail if user enters an unregistered email", () =>{
            let wrongPayload = {...signInPayload}
            wrongPayload.email = "test2@xyz.com"

            const { body, statusCode} = request(app)
            .post("/api/v1/auth/login")
            send(wrongPayload)

            expect(statusCode).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Information. Enter a registered email")
        })

        it("should fail if user enters a wrong password", () =>{
            let wrongPayload = {...signInPayload}
            wrongPayload.password = "abcdefgh"

            const { body, statusCode} = request(app)
            .post("/api/v1/auth/login")
            send(wrongPayload)

            expect(statusCode).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Information. Enter a registered email")
        })
  })
});
