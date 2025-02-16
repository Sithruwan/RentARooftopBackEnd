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
const login = async (req, res) => {
    try {
        const {token,refreshToken,userData}  = await userService.loginUser(req.body);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 7*24 * 60 * 60 * 1000 //7day
        });
        res.status(201).json({
            msg:"User loggedin successfully",
            data:{
                token,
                userData
            }
        });
    }catch(err){
        res.status(500).json({
            msg:err.message,
            data:null
        });
    }
}

const refreshToken = async (req, res) => {
    let newToken;
    try {
        if(req.cookies?.jwt){
            const refreshToken = req.cookies.jwt;
             newToken  = await userService.refreshToken(refreshToken);
        }
        res.status(201).json({
            msg:"access token created successfully",
            data:{
                newToken
            }
        });
    }catch(err){
        res.status(500).json({
            msg:err.message,
            data:null
        });
    }
}

const logout = async (req, res) => {
      // Clear the refresh token cookie by setting it to an expired value
      res.cookie('jwt', '', { 
        httpOnly: true, 
        sameSite: 'None', 
        secure: true, 
        maxAge: 0 // Set maxAge to 0 to expire the cookie immediately
    });

    return res.status(200).json({ message: 'Logged out successfully' });
}


const userController = { register,login,refreshToken,logout };

export default userController