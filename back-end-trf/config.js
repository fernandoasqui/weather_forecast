import env from 'env-var'


const config = {
    API_URL: env.get('API_URL').required().asUrlString(),
    API_KEY: env.get('API_KEY').required().asString(),
    API_URL_SEARCH_LAT_LON: env.get('API_URL_SEARCH_LAT_LON').required().asUrlString()
}

export default config