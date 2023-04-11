import express from "express";
import { Deletetask, Updatetask, getMytask, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.post("/new",isAuthenticated,newTask)

router.get("/my",isAuthenticated,getMytask)
router.route("/:id").put( isAuthenticated, Updatetask).delete(isAuthenticated ,Deletetask)


export default router