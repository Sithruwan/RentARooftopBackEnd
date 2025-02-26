import * as rooftopRepo from '../repos/rooftop.repo.mjs'
export const addRooftop = async (data) => {
    return await rooftopRepo.createRooftop(data);
}
export const getAllRooftops = async () => {
    return await rooftopRepo.findAllRooftops();
}
export const getRooftopById = async (id) => {
    return await rooftopRepo.findRooftopById(id);
}
export const updateRooftopById = async (id, data, userId) => {
    const rooftop = await rooftopRepo.findRooftopById(id);
    if (!rooftop) {
        throw new Error('Rooftop not found');
    }
    if (rooftop.owner._id.toString() !== userId) {
        throw new Error('You are not authorized to update this rooftop');
    }
    Object.assign(rooftop, data);
    return await rooftopRepo.updateRooftopById(id, rooftop);
}
export const deleteRooftopById = async (id, userId) => {
    const rooftop = await rooftopRepo.findRooftopById(id);
    if (!rooftop) {
        throw new Error("Rooftop not found");
    }
    if (rooftop.owner._id.toString() !== userId) {
        throw new Error("Unauthorized to delete this rooftop");
    }

    return await rooftopRepo.deleteRooftopById(id);
};
