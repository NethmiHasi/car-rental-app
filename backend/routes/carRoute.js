import express from "express";
import { listCar, removeCar } from "../controllers/carController";
import multer from "multer";

const carRouter = express.Router();

carRouter.get("/list", listCar);
carRouter.post("/remove", removeCar);

export default carRouter;
