
import express, {Response, Request} from 'express';
import config from './config/config';
import { db } from "./loaders/dbConnect"
import userRoutes from "./api/routes/userRoutes"

 function startServer() {
    
    const app = express();
     //connect to the database   
 db();

   app.use(express.json());
   
app.use("/api/v1",userRoutes)

app.get("/",(req:Request,res:Response)=>{
    res.send("hello ji kesi ho");
  
})

    app.listen(config.port, () => {
        console.log("server running")
    }).on("error",err=>{
        console.log(`error ${err}`)
        process.exit(1);
    })

}
startServer();