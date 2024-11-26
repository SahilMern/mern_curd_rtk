import express from "express";
import { userRegister, userLogin, userDetails, singleUser, userUpdate } from "../Controllers/user.Controllers.js";
const router = express.Router()

//?User Register
router.post("/register", userRegister);

//?User Login
router.post("/login", userLogin);

//?UserDeatails 
router.get("/userDetails", userDetails);

//?Single User Details
router.get("/singleUser/:id", singleUser);

//?Single User Details
router.patch("/userUpdate/:id", userUpdate);

export default router;
