import carModel from "../models/carModel";
import fs from "fs";

const addCar = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const car = new carModel({
    make: req.body.name,
    model: req.body.model,
    price: req.body.price,
    year: req.body.year,
    image: image_filename,
    seat: req.body.seat,
    availability: req.body.availability,
    description: req.body.description,
  });

  try {
    await car.save();
    res.json({ success: true, message: "car added successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listCar = async (req, res) => {
  try {
    const cars = await carModel.find({});
    res.json({ success: true, data: cars });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default { listCar, addCar };
