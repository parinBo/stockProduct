import * as mongodb from 'mongodb';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export const  collections = { 
    products: mongodb.Collection ,
    stock: mongodb.Collection,
    users: mongoose.Model
}

export async function connectDatabase () {
   try {
    dotenv.config();
    mongoose.set('strictQuery', true);
    const url = process.env.DB_URI_STRING || '';
    await mongoose.connect(url);
    console.log(`Successfully connected to database`);
   }catch (error:any) {
    console.log(process.env.DB_URI_STRING)
    console.log('server database error', error);
   }
}

