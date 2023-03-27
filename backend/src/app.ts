import express from "express";
import cors from 'cors';
import { userRouter } from "./routes/users";
import { connectDatabase } from "./services/db.service";
import { productRouter } from "./routes/products";
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRouter);
app.use('/',productRouter);
app.use('', (req, res)=>{
    res.json({test:'good'})
});

const PORT:number = process.env.PORT as unknown as number || 8000;
try{
    app.listen(PORT,'0.0.0.0', ()=>{
        connectDatabase();
        console.log('app start', PORT);
    })
}catch (error: any){

}
