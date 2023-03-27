import { Request, Response } from "express"
import { ProductModel } from "../models/product";
import { Products } from "../models/schema"
import moment from 'moment';

const getProduct = async (req: Request, res: Response) => {
    const data = req.query as any;
    try {
        if (!data.type) {
            res.status(400).json({ status: 'e', code: 'ERROR.TYPE', message: '' });
        } else {
            let result = null;
            if (data.report) {
                result = await Products.find().where('type').equals(data.type);
            } else {
                const pipeline: any = [
                    { $match: { type: data.type } },
                    { $sort: { updateDate: -1 } },
                    { $group: { _id: "$sku", latest: { $first: "$$ROOT" } } },
                    { $project: { _id: 0, sku: "$latest.sku", productName: "$latest.productName", import: "$latest.import", export: "$latest.export", balance: "$latest.balance", updateDate: "$latest.updateDate" } },
                    { $sort : { sku : 1 } }
                ];
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
    try {
        if (!body.type) {
            res.status(400).json({ status: 'e', code: 'ERROR.TYPE', message: '' });
        } else {
            const dataSameType = (await Products.find({ type: body.type })).length;
            let balance = body.import - body.export;
            let sku = body.type[0] + '-' + (dataSameType + 1);
            const products = await Products.find({ productName: body.productName, type: body.type });
            if (products.length) {
                const lastData: ProductModel = products?.[products.length - 1];
                sku = lastData.sku;
                balance += lastData?.balance || 0;
            }
            if (balance < 0) {
                return res.status(500).json({ status: 'e', code: 'ERROR.WRONG_BALANCE', data: [] });
            }
            body = {
                ...body,
                sku,
                balance,
                updateDate: moment().toDate()
            }
            const product = new Products(body);
            product.save();
            return res.status(201).json({ status: 's', code: 'success', data: [] });
        }

    } catch (err: any) {
        console.log(err)
        res.status(500).json({ status: 'e', code: 'error', message: err });
    }
}

const delAllProducts = async (req: Request, res: Response) => {
    Products.deleteMany({ type: req.query.type }).exec()
    res.status(201).json({ status: 's', code: 'success', data: [] });
}

export { addProduct, getProduct, delAllProducts }