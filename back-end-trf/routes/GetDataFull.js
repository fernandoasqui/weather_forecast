import express, { request, response } from "express";
import getPrevFromDate from '../models/editorDatabaseApi.js'


const router = express.Router();

router.use(express.json());

router.get('/', async(request, response) => {
    try {
        const queryExecute = `select * from weather;`
        let body = await getPrevFromDate(queryExecute);
        if(body.length  == 0){
            return response.status(404).json(`message: No data available`)
        }
        return response.status(200).json(body)
    }catch(error){
        console.log(error.stack)
        return response.status(403).json(`message: Internal server error`)
    }
})


export default router
