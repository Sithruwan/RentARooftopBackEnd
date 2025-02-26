import Rooftop from "../models/rooftop.model.mjs";


export const createRooftop = (data) => Rooftop.create(data);

export const findAllRooftops = () => Rooftop.find().populate("owner", "name email");

export const findRooftopById = (id) => Rooftop.findById(id).populate("owner", "name email");

export const updateRooftopById = (id, data) => Rooftop.findByIdAndUpdate(id, data, { new: true });

export const deleteRooftopById = (id) => Rooftop.findByIdAndDelete(id);
