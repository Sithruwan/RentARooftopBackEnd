import userRepo from "../repos/user.repo.mjs";
const registerUser = async (reqbody) => {
    const { email, password, username } = reqbody;
    // Check if the email is already in the database
    const user = await userRepo.findUserByUsername(username);
    if (user) {
        throw new Error("Username already exists");
    }
    const userData = { email, password, username };
    return await userRepo.createUser(userData);
};


const userService = { registerUser };

export default userService