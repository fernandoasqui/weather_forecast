import pg from 'pg';


const { Client } = pg;

async function getPrevFromDate(getQuery) {
    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: 'localhost',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
    });

    try{
        await client.connect();
        console.log('Conectado ao banco de dados');

        const result = await client.query(getQuery);
        console.log('consulta realizada')
        return result.rows

    }catch (error) {
        await client.query('ROLLBACK');
        console.error(`Erro no banco de dados, transação revertida: ${error.stack}`);
    } finally {
        await client.end();
        console.log('Conexão encerrada');
    }
}

export default getPrevFromDate;