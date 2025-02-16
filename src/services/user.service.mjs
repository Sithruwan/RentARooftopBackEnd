import userRepo from "../repos/user.repo.mjs";
import { getToken,verifyRefreshToken,getRefreshToken } from "../utills/jwt.mjs";
const registerUser = async (reqbody) => {
    const { email, password, username, role, phone, profilePicture,name } = reqbody;
    // Check if the email is already in the database
    const user = await userRepo.findUserByUsername(username);
    if (user) {
        throw new Error("Username already exists");
    }
    const userData = { email, password, username, role, phone, profilePicture,name };
    return await userRepo.createUser(userData);
};

const loginUser = async (reqbody) => {
    const { email, password, username } = reqbody;
    // Check if the email is already in the database
    const user = await userRepo.findUserByUsername(username);
    const isMatch = await user.comparePassword(password);
    if (!user) {
        throw new Error("Username not exists");
    }
    if (!isMatch) {
        throw new Error("Incorrect password");
    }
    //genarate JWT token
    const payload = {
        username: user.name,
        role: user.role,
        photoUrl:user.profilePicture
    }
    
    const token = await getToken(payload);
    const refreshToken = await getRefreshToken(payload);
    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture
    };
   
    return {token,userData,refreshToken};
};

const refreshToken = async (token) => {
    const decoded = await verifyRefreshToken(token);
    if (decoded === null || decoded === undefined || decoded === "") {
        throw new Error("Invalid token");
    }
    const payload = {
        username: decoded.username,
        role: decoded.role,
        photoUrl:decoded.photoUrl
    }
    const newToken = await getToken(payload);
    return { token: newToken };
}


const userService = { registerUser,loginUser,refreshToken };

export default userService