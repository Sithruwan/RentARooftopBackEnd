import User from "../models/user.model.mjs";

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const userRepo = { createUser, findUserByUsername, findUserById, findUserByEmail, updateUserById };

export default userRepo;