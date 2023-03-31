import { Request, Response } from "express"
import { ProductModel } from "../models/product";
import { LogProducts, Products } from "../models/schema"
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import { UserModel } from "../models/user";
const getProduct = async (req: Request, res: Response) => {
    const data = req.query as any;
    try {
        if (!data.type) {
            res.status(400).json({ status: 'e', code: 'ERROR.TYPE', message: '' });
        } else {
            let result = null;
            if (data.report) {
                const pipeline = [
                    { $match: { type: data.type } },
                    { $project: { 
                        _id: 0, 
                        sku: "$sku", 
                        productName: "$productName", 
                        import: "$import", export: "$export", balance: "$balance",
                        username:"$updateUSer",
                        updateDate: "$updateDate" } },
                ]
                result = await LogProducts.aggregate(pipeline);
            } else {
                const pipeline: any = [
                    { $match: { type: data.type } },
                    { $sort : { sku : 1 } }
                ];
                // const pipeline: any = [
                //     { $match: { type: data.type } },
                //     { $sort: { updateDate: -1 } },
                //     { $group: { _id: "$sku", latest: { $first: "$$ROOT" } } },
                //     { $project: { 
                //         _id: 0, 
                //         sku: "$latest.sku", 
                //         productName: "$latest.productName", 
                //         import: "$latest.import", export: "$latest.export", balance: "$latest.balance", updateDate: "$latest.updateDate" } },
                //     { $sort : { sku : 1 } }
                // ];
                result = await Products.aggregate(pipeline)
            }
            res.status(200).json({ status: 's', code: 'success', data: result });
        }

    } catch (err: any) {
        res.status(500).json({ status: 'e', code: 'error', message: err });
    }
}

const addProduct = async (req: Request, res: Response) => {
    let body: ProductModel = req.body as any;
    let user = jsonwebtoken.decode(req.headers['authorization'] || '') as UserModel
    try {
        if (!body.type) {
            res.status(400).json({ status: 'e', code: 'ERROR.TYPE', message: '' });
        } else {
            const dataSameType = (await Products.find({ type: body.type })).length;
            let balance = body.import - body.export;
            let sku =  body.sku? body.sku : body.type[0] + '-' + (dataSameType + 1);
            const products = await Products.findOne({ sku, type: body.type });
            if (products) {
                sku = products.sku;
                balance += products?.balance || 0;
            }
            if (balance < 0) {
                throw { status: 'e', code: 'ERROR.WRONG_BALANCE', data: [] };
            }
            body = {
                ...body,
                sku,
                balance,
                updateDate: moment().toDate(),
                updateUSer: user?.username || ''
            }
            if(products){
                await Products.updateOne({sku},{$set:{...body,productName:body.productName}});
            }else{
                const product = new Products(body);
                const validate = product.validateSync();
                if(validate?.errors){
                    throw { status: 'e', code: 'error', message: getError(validate?.errors) };
                }
                product.save();
            }
            const logProduct = new LogProducts(body);
            logProduct.save();
            return res.status(201).json({ status: 's', code: 'success', data: [] });
        }

    } catch (err: any) {
        res.status(500).json(err);
    }
}

const delProduct = async (req: Request, res: Response) => {
    try{
        const {sku,type}= req.query as any;
    let user = jsonwebtoken.decode(req.headers['authorization'] || '') as UserModel
    let product = await Products.findOne({sku,type}) as ProductModel;
    if(product){
        let body = {
            updateDate: moment().toDate(),
            updateUSer: (user?.username || '') + '[delete]',
            sku: product.sku,
            productName: product.productName,
            import: 0,
            export: 0,
            balance: 0,
            productCost: 0,
            productPrice: 0,
            type: product.type  
          }
        await (new LogProducts(body)).save()
        Products.deleteOne({sku:sku}).exec();
        res.status(201).json({ status: 's', code: 'success', data: [] });
    }else{
        throw {status: 'e',code:'ERROR.WRONG_PRODUCT', message:''}
    }
    }catch (err: any) {
        res.status(500).json({ status: 'e', code: 'error', message: err });
    }
}

const delAllProducts = async (req: Request, res: Response) => {
    try{
        Products.deleteMany({ type: req.query.type }).exec()
        LogProducts.deleteMany({ type: req.query.type }).exec()
        res.status(201).json({ status: 's', code: 'success', data: [] });
    }catch(err:any){
        res.status(500).json({ status: 'e', code: 'error', message: err });
    }
}

const getError = (errors:any) => {
    return Object.keys(errors).map(key=> errors[key].message);
}

export { addProduct, getProduct, delAllProducts,delProduct }