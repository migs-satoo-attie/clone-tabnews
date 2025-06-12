import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Utilizo as funções de query do pg para realizar as consultas no banco de dados com prevenção de SQL Injection
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
  query: query,
};

// psql --host=localhost --port=5432 --username=postgres --password=test
