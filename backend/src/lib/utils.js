import jwt from"jsonwebtoken"

export const generateToken=(UserId,res)=>{
    const token =jwt.sign({UserId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*100,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development"
    });
    return token;
}