import express, { request, response } from "express";
import {base_url_search_lat_lon, api_key, base_url_weather} from '../services/urls.js';
import {requestApiCityName, requestApiLatLong} from "../services/serviceApi.js";

const router = express.Router();

router.use(express.json());

router.post('/', async(request, response) => {
    try {
        let city = request.body;
        if(city){
            saveTo(city['city']);
            return response.status(200).json({
                "message": 'Dados recebidos com sucesso!',
                "city": {city},
            });
        }
        return response.status(403).json(`message: Internal server error`)
        
    }catch(error){
        console.log(error.stack)
        return response.status(403).json(`message: Internal server error`)
    }
})

const saveTo = async(_cityName) => {
    let url = `${base_url_search_lat_lon}${_cityName}&apikey=${api_key}`
    let data = await requestApiCityName(url)
    let url2 = `${base_url_weather}apikey=${api_key}&lat=${data['latitude']}&lon=${data['longitude']}&asl=665&format=json`
    await requestApiLatLong(url2);
    console.log('Dados processados')
}

export default router
