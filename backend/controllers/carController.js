import carModel from "../models/carModel";

const listCar = async(req, res) =>{
    try {
        const cars = await carModel.find({});
        res.json({success:true, data:cars})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
        
    }


}

export default {listCar};