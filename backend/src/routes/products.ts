import * as express from 'express';
import { authMiddleware } from '../config/auth';
import { addProduct, delAllProducts, getProduct } from '../controllers/product';


export const productRouter = express.Router();

productRouter.get('/getProduct',authMiddleware,getProduct);
productRouter.get('/delAllProducts',authMiddleware,delAllProducts);
productRouter.post('/addProduct',authMiddleware, addProduct);