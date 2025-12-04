import express from "express";
import { listCar, removeCar, addCar } from "../controllers/carController";
import multer from "multer";

const carRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({storage:storage});

carRouter.get("/add", upload.single("image"), addCar);
carRouter.get("/list", listCar);
carRouter.post("/remove", removeCar);

export default carRouter;
