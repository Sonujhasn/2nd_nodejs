import express from "express";
import { getAllUsers, getuserbyId, register, specialfunc } from "../controllers/user.js";
import {USer} from "../models/user.js"
const router =express.Router()

router.get("/all",getAllUsers)

router.post("/new",register)

router.get("/userid/special",specialfunc)

router.get("/userid/:id",getuserbyId)
export default router;