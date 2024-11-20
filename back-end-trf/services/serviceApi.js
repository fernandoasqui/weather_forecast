import saveToDatabase from '../models/saveToDatabase.js'


async function requestApiLatLong (url){
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        let data_day = data.data_day
        await saveToDatabase(data_day);
        return data_day
    } catch (error) {
        console.log('Erro na requisição:', error);
    }
}

async function requestApiCityName (url){
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        const lat = data.results[0].lat;
        const lon = data.results[0].lon;
        const latLong = {"latitude":lat, "longitude":lon}
        return latLong

    } catch (error) {
        console.log('Erro na requisição:', error);
    }
}

export {requestApiLatLong, requestApiCityName};