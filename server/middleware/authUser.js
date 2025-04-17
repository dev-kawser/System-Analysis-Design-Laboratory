import jwt from 'jsonwebtoken'

const authUser = async ( req, res, next ) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json({ success: false, message: 'Not Authorized. \n Please Login Again' })
    }

    try {
        const token_Decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_Decode.id) {
            req.userId = token_Decode.id;
        } else{
            return res.json({ success: false, message: 'Not Authorized.' })
        }
        next();
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export default authUser;
