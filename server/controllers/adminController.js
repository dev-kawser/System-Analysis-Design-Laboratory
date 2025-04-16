import jwt from "jsonwebtoken";

//login admin : /api/admin/login
export const adminLogin = async ( req, res ) => {
    try {
        const { email, password } = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('adminToken', token, {
                httpOnly: true, //preventing js to access cookie
                secure: process.env.NODE_ENV === 'production', //Use secure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
                maxAge: 7 * 24 * 60 * 1000, //cookie expiration time
            });

            return res.json({success: true, message: 'Logged In!!!'})
        } else{
            return res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//admin auth : /api/admin/is-auth
export const isAdminAuth = async ( req, res ) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message })
    }
}

//admin logout : /api/admin/logout
export const adminLogout = async ( req, res ) => {
    try {
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "You have successfuly logged Outtt!" });

    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message })
    }
}
