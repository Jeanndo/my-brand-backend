// @ts-nocheck
import mongoose from "mongoose"
import request from "supertest"
import app from "./../../app"
import dotenv from "dotenv"

dotenv.config({ path: "./../config.env" })

//*** CONNECT TO DB BEFOR EACH TEST ***

beforeEach(async () => {
  const TEST__DB = process.env.TEST__DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  )
  await mongoose
    .connect(TEST__DB)
    .then(() => console.log("DB Connected Successfuly!"))
    .catch((error) => {
      console.log(error.stack)
    })
}, 9000)

//***SIGNUP TEST***

// test("should signup a user", async () => {
//   let user
//   user = await request(app)
//     .post("/api/v1/users/signup")
//     .send({
//       firstName: "Cyifuzo ",
//       lastName: "Jean De Dieu",
//       email: "cyifuzo1@gmail.com",
//       password: "Jeanndo123",
//       confirmPassword: "Jeanndo123",
//     })
//     .expect(201)
//   console.log(user)
// })

//***LOGIN TEST***

// test("should sign in user", async () => {
//   await request(app)
//     .post("/api/v1/users/login")
//     .send({
//       email: "cyifuzo1@gmail.com",
//       password: "Jeanndo123",
//     })
//     .expect(200)
// })

//***ALL USERS***

test("should show all users", async () => {
  let users
  users = await request(app).get("/api/v1/users").expect(200)
  console.log(users)
}, 9000)

// *** GET A SINGLE USER ***

// test("should return a single user", async () => {
//   let users
//   users = await request(app)
//     .get("/api/v1/users/622fe7cb9006cde2a3f85191")
//     .expect(200)
//   console.log(users)
// }, 9000)

//***UPDATE USER***

// test("should return a single user", async () => {
//   let user
//   user = await request(app)
//     .patch("/api/v1/users/622fe7cb9006cde2a3f85191")
//     .send({ lastName: "UKWITEGETSE Dev..." })
//     .expect(200)
//   console.log(user)
// }, 9000)

// DELETE USER

// test("should return a single user", async () => {
//   await request(app)
//     .delete("/api/v1/users/622fe7cb9006cde2a3f85191")
//     .send({ lastName: "UKWITEGETSE Dev..." })
//     .expect(200)
// }, 9000)

// TESTING MESSAGE

// test("should create a message", async () => {
//   let newMessage = await request(app)
//     .post("/api/v1/messages")
//     .send({
//       firstName: "Jean De Dieu",
//       lastName: "UKWITEGETSE",
//       email: "ukjeando@gmail.com",
//       message: "Hello world",
//     })
//     .expect(201)
//   console.log(newMessage)
// }, 9000)
