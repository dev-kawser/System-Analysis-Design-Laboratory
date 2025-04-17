import jwt from "jsonwebtoken";

const authAdmin = async ( req, res, next ) => {

    const { adminToken } = req.cookies;

    if(!sellerToken) {
        return res.json({ success: false, message: "Not authorized" });
    }

    try {
        const token_Decode = jwt.verify(adminToken, process.env.JWT_SECRET)
                if (token_Decode.email === process.env.ADMIN_EMAIL) {
                    next();
                } else{
                    return res.json({ success: false, message: 'Not Authorized.' })
                }

    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message })
    }
}

export default authAdmin;
