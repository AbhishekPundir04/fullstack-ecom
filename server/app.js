import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { createTable } from './utils/createTable.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const app = express();
config({path:"./config/config.env"});
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    method:["GET"  ,"POST","PUT","DELETE"],
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    tempFileDir:"./uploads",
    useTempFiles:true
}))
createTable()
app.use(errorMiddleware);
export default app;