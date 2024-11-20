import express, { request, response } from "express";
import {base_url_weather, api_key} from '../services/urls.js';
import {requestApiLatLong} from "../services/serviceApi.js";


const router = express.Router();

router.use(express.json());

router.post('/', async(request, response) => {
    try {
        let {latitude, longitude} = request.body
        if(latitude || longitude){
            saveTo(latitude, longitude);
            return response.status(200).json({
                "message": 'Dados recebidos com sucesso!',
                "latitude": {latitude},
                "longitude": {longitude}
              });
        }
        return response.status(403).json(`message: Internal server error`)
        
    }catch(error){
        console.log(error.stack)
        return response.status(403).json(`message: Internal server error`)
    }
})

const saveTo = (_latitude, _longitude) => {
    let url = `${base_url_weather}apikey=${api_key}&lat=${_latitude}&lon=${_longitude}&asl=665&format=json`
    console.log(url)
    requestApiLatLong(url)
}

export default router

