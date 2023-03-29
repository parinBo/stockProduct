import * as express from 'express';
import { authMiddleware } from '../config/auth';
import { addProduct, delAllProducts, delProduct, getProduct } from '../controllers/product';


export const productRouter = express.Router();

productRouter.get('/getProduct',authMiddleware,getProduct);
productRouter.get('/delAllProducts',delAllProducts);
productRouter.delete('/delProduct',authMiddleware,delProduct);
productRouter.post('/addProduct',authMiddleware, addProduct);