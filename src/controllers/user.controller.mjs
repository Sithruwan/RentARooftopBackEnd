import userService from "../services/user.service.mjs";

const register = async (req, res) => {
    try {
        const user  = await userService.registerUser(req.body);
        res.status(201).json({
            msg:"User created successfully",
            data:user
        });
    }catch(err){
        res.status(500).json({
            msg:err.message,
            data:null
        });
    }
}


const userController = { register };

export default userController