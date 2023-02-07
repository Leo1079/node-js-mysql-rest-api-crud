import express from "express";
import employeesRouter from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

import  {PORT} from './config.js'

const app = express();

app.use(express.json());
app.use(indexRoutes);
app.use('/api',employeesRouter);

app.use((req,res,next)=>{
    res.status(404).json({
        message:'Not found sorry'
    })
})

app.listen(PORT);
console.log(`server on port ${PORT}`);
