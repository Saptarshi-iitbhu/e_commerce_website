import jwt from "jsonwebtoken"

const authUser = async(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if(!token){
        return res.json({success:false, message:"Not Authorized Login Again"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.id){
            req.userId = decoded.id
        }
        else{
            return req.json({success:false, message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export default authUser