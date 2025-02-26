import * as rooftopService from '../services/rooftop.service.mjs'
import { validationResult } from 'express-validator'

export const addRooftop = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = { ...req.body, owner: req.user.id };
        
        
        const rooftop = await rooftopService.addRooftop(data);
        res.status(201).json({
            success: true,
            message: 'Rooftop added successfully',
            data: rooftop
        });
    } catch (error) {
        next(error);
    }
}

export const getAllRooftops = async (req, res, next) => {
    try {
        const rooftops = await rooftopService.getAllRooftops();
        res.status(200).json({
            success: true,
            message: 'All rooftops fetched successfully',
            data: rooftops
        });
    } catch (error) {
        next(error);
    }
}
export const getRooftopById = async (req, res, next) => {
    try {
        const rooftop = await rooftopService.getRooftopById(req.params.id);
        if (!rooftop) {
            return res.status(404).json({
                success: false,
                message: "Rooftop not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Rooftop fetched successfully',
            data: rooftop
        });
    } catch (error) {
        next(error);
    }
};

export const updateRooftop = async (req, res, next) => {
    try {
        const updatedRooftop = await rooftopService.updateRooftopById(req.params.id, req.body, req.user.id);

        res.status(200).json({
            success: true,
            message: "Rooftop updated successfully",
            data: updatedRooftop
        });
    } catch (error) {
        next(error);
    }
};



export const deleteRooftop = async (req, res, next) => {
    try {
        await rooftopService.deleteRooftopById(req.params.id, req.user.id);
        res.status(200).json({ success: true, message: "Rooftop deleted successfully" });
    } catch (error) {
        next(error);
    }
};

