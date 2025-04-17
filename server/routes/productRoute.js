import express from 'express'
import upload from '../config/multer.js';
import { addProduct, listProducts, singleProduct, updateStock } from '../controllers/productController.js';
import authAdmin from '../middleware/authAdmin.js';

const productRouter = express.Router();

productRouter.post('/add', authAdmin, upload.array('images', 10), addProduct);

// productRouter.post('/remove', authAdmin, removeProduct);

productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/stock', authAdmin, updateStock);



export default productRouter;
