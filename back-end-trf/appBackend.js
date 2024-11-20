import express, { request, response } from "express";
import cors from "cors";
import routers from "./routes/index.js"


// Server API do projeto
const app = express();
app.use(cors())
app.use(express.json())

app.use('/api', routers)


app.listen(3002, () => {
    console.log('Server is running!')
    }
)
