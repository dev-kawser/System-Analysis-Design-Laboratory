import { v2 as cloudinary  } from "cloudinary";
import productModel from "../models/Product.js";

//add product : /api/product/add
const addProduct = async ( req, res ) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files;


        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type:'image' });
                return result.secure_url;
            })
        )

        await productModel.create({...productData, image: imagesUrl})

        res.json({success:true, message: "Product Added"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//list product : /api/product/list
const listProducts = async ( req, res ) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//remove product : /api/product/remove
const removeProduct = async ( req, res ) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//get product info : /api/product/id
const singleProduct = async ( req, res ) => {
    try {
        const { id } = req.body
        const product = await productModel.findById(id)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//update product stock : /api/product/stock
const updateStock = async ( req, res ) => {
    try {
        const { id, ins } = req.body;
        await productModel.findByIdAndUpdate(id, { inStock: ins })

        res.json({ success: true, message: "Stock Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { listProducts, addProduct, removeProduct, singleProduct, updateStock }
