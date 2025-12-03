import express from "express";
import { listCar } from "../controllers/carController";
import multer from "multer";

const carRouter = express;

carRouter.get("/list", listCar);

export default carRouter;
