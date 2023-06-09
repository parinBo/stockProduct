import { Schema, Document, model } from "mongoose";
import { ProductModel } from "./product";
import { UserModel } from "./user";

interface UserMethods extends UserModel,Document{
    findByUserName: (username:string) => Promise<Object[]>;
}
const userSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    username:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    role:{
        type: String,
        default: '0'
    }
})
userSchema.methods.findByUsername = (username:string)=>{
    return model('Users',userSchema).find({username});
}

const Users = model<UserMethods>('Users',userSchema);


interface ProductMethods extends ProductModel,Document {

}
const productSchema = new Schema<ProductMethods>({
    sku:{
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: [true, 'productName is required']
    },
    import: {
        type: Number,
        default: 0
    },
    export: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    productCost: {
        type: Number,
        default: 0
    },
    productPrice: {
        type: Number
    },
    type: {
        type: String,
        required: true
    },
    importDate: {
        type: Date,
        default: null
    },
    exportDate: {
        type: Date,
        default: null
    },
    updateDate: {
        type: Date,
        default: null
    },
    roastDate: {
        type: Date,
        default: null
    },
    updateUSer: {
        type: String
    },
})


const LogProducts = model('log_products',productSchema);
const Products = model('products',productSchema);
export  {Users, Products,LogProducts};

