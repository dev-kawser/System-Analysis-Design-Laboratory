import Address from "../models/Address.js";


//add address : /api/address/add
export const addAddress = async ( req, res ) => {
    try {
        const { address, userId } = req.body;
        await Address.create({...address, userId})

        res.json({ success: true, message: 'Address added successfully.' })
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//get address : /api/address/get
// export const getAddress = async ( req, res ) => {
//     try {
//         const { userId } = req.body;
//         const addresses = await Address.find({userId})

//         res.json({ success: true, addresses })
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message: error.message})
//     }
// }
export const getAddress = async (req, res) => {
    try {
        // Get userId from authenticated user (set by authUser middleware)
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.error("Address fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch addresses"
        });
    }
};
