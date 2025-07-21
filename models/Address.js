import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    building: {type: String},
    street: {type: String},
    city: {type: String},
    state: {type: String},
    postalCode: {type: String},
    country: {type: String} 
})

export default addressSchema;