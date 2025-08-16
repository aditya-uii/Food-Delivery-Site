import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRotues.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRotues.js"
import webHookRouter from './routes/webHook.js';
import bodyParser from 'body-parser';





// app config
const app =express()
const port= 4000

// middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDb().catch((error) => {
    console.error(`DB connection failed: ${error.message}`);
  });
  

 


//api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api', webHookRouter);


app.get("/",(req,res)=>{
res.send('API working');
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port} `);
})


