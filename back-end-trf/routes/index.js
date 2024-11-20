import express, { request, response } from "express";
import GetDataRoute from "./GetData.js";
import latitude from './PostLatitude.js';
import city from './PostCityName.js';
import dataFull from './GetDataFull.js';


const router = express.Router();

router.get('/',(request, response) => {
    response.send('API Online!')
})

router.use('/prevfromdate',GetDataRoute)

router.use('/latitude',latitude)

router.use('/city',city)

router.use('/datafull',dataFull)

export default router;