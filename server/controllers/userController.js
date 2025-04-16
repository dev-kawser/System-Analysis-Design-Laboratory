import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user : /api/user/registerUser
export const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {

        if( !name || !password || !email){
            return res.json({success:false, message: "Missing Details"})
        }

        //checking is user already exists
        const existingUser = await User.findOne( {email} )

        if (existingUser) {
            return res.json( {success: false, message: 'User already exists.'} )
        }

        //hashing user password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name:name,
            email:email,
            password: hashedPassword
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //preventing js to access cookie
            secure: process.env.NODE_ENV === 'production', //Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 1000, //cookie expiration time
        });

        return res.json( {success: true, user: {email: user.email, name: user.name}} )

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// login user : /api/user/login
export const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email & Password are required!' });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.json({ success: false, message: 'Invalid Email or Password!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Email or Password!' });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 1000, //cookie expiration time
        });

        return res.json( {success: true, user: {email: user.email, name: user.name}} )

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
