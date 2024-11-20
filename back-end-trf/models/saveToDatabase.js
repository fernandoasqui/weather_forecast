import pg from 'pg';


const { Client } = pg;

async function saveToDatabase(data) {
   const client = new Client({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
   });

   try {
      await client.connect();
      console.log('Conectado ao banco de dados');

      crateTableWeather('weather', client);

      await client.query('TRUNCATE weather;');
      console.log('Tabela limpa');

      await inputIntoDatabase(client, data);
      
      console.log('Gravado dados!')
   } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Erro no banco de dados, transação revertida: ${error.stack}`);
   } finally {
      await client.end();
      console.log('Conexão encerrada');
   }
}

async function crateTableWeather(table , client){
   const queryCreateTable =`
      CREATE TABLE IF NOT EXISTS ${table} (
         id SERIAL PRIMARY key,
         date_prev VARCHAR(20), -- time
         temp_max VARCHAR(10), -- Máxima temperatura
         temp_min VARCHAR(10), -- Mínima temperatura
         climatic_condition VARCHAR(20),
         wind_speed VARCHAR(20), -- Velocidade média do vento
         wind_direction VARCHAR(20), -- Direção do vento
         precipitation_probability VARCHAR(20), -- Probabilidade de precipitação
         created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );`
   await client.query(queryCreateTable);
   return console.log('Tabela criada!');
}

async function inputIntoDatabase(client, data) {
   for (let index = 0; index < data.time.length; index++) {
      const date = data.time[index];
      const query = `
         INSERT INTO weather (
            date_prev,
            temp_max,
            temp_min,
            climatic_condition,
            wind_speed,
            wind_direction,
            precipitation_probability
         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      const values = [
         date,
         data.temperature_max[index],
         data.temperature_min[index],
         data.predictability[index],
         data.windspeed_mean[index],
         data.winddirection[index],
         data.precipitation_probability[index]
      ];
      await client.query(query, values);
      console.log(`Inserido: ${date}`);
   }
}


export default saveToDatabase;