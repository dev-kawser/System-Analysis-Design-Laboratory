import { v2 as cloudinary  } from "cloudinary";
import product from "../models/Product.js";

//add product : /api/product/add
const addProduct = async ( req, res ) => {
    try {
        // const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        let productData = JSON.parse(req.body.productData)

        const images = req.files;

        // const image1 = req.files.image1 && req.files.image1[0]
        // const image2 = req.files.image2 && req.files.image2[0]
        // const image3 = req.files.image3 && req.files.image3[0]
        // const image4 = req.files.image4 && req.files.image4[0]

        // const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type:'image' });
                return result.secure_url;
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.json({success:true, message: "Product Added"})


        // const productData = {
        //     name,
        //     description,
        //     category,
        //     price: Number(price),
        //     subCategory,
        //     bestseller: bestseller === 'true' ? true : false,
        //     sizes: JSON.parse(sizes),
        //     image: imagesUrl,
        //     date: Date.now()
        // }

        // console.log(name, description, price, category, subCategory, sizes, bestseller)
        // console.log(productData);
        // const product = new productModel(productData);
        // await product.save();

        // res.json({success:true, message: "Product Added"})

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

//gupdate product stock : /api/product/stock
const updateStock = async ( req, res ) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock })

        res.json({ success: true, message: "Stock Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { listProducts, addProduct, removeProduct, singleProduct, updateStock }
