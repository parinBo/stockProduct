import * as express from 'express';
import { addProduct, delAllProducts, getProduct } from '../controllers/product';


export const productRouter = express.Router();

productRouter.get('/getProduct',getProduct);
productRouter.get('/delAllProducts',delAllProducts);
productRouter.post('/addProduct', addProduct);