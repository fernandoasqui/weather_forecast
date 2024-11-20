import express, { request, response } from "express";
import getPrevFromDate from '../models/editorDatabaseApi.js'


const router = express.Router();

router.use(express.json());

function dateIsNotValid(date){
    const regexExpress = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regexExpress.test(date);
}

router.get('/:date', async(request, response) => {
    try {
        const dateRequest = request.params.date;
        const dateIsValid = dateIsNotValid(dateRequest)
        console.log(dateIsValid, dateRequest)
        if(dateIsValid === false){
            return response.status(403).json(`message: Invalid format date`)
        }
        const queryExecute = `select * from weather where date_prev = '${dateRequest}';`
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
