import database from "infra/database";

async function status(request, response) {
  // FORMATA A DATA ATUAL EM ISO 8601
  const updatedAt = new Date().toISOString();

  try {
    // CONSULTANDO A DATABASE VIA QUERIES /////////////////////////////////////////////////////////////////////////////////////////////////////////
    const databaseVersionResult = await database.query("SHOW server_version;"); // Consulta a versão
    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections;",
    ); // Consulta o número máximo de conexões
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CONSULTA DE CONEXÕES ABERTAS VIA QUERY COM PARAMETROS DINAMICOS(PREVENÇÃO DE SQL INJECTION)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const databaseName = process.env.POSTGRES_DB; // CRIA UMA CONSTANTE COM O NOME DO BANCO DE DADOS
    const databaseOpenedConnectionsResult = await database.query({
      // CONSULTA O NÚMERO DE CONEXÕES ABERTAS
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;", // REALIZA A QUERY UTILIZANDO AS FORMATAÇÕES DO PG DE SEGURANÇA
      values: [databaseName], // ATRIBUINDO OS VALORES DE SEGURANÇA COM O NOME DA VARIÁVEL
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // EXTRAI OS VALORES DAS CONSULTAS
    const versionDb = databaseVersionResult.rows[0].server_version; // ESPECIFÍCA O VALOR DA QUERY PRÉ-ADQUIRIDO
    const maxConnections = parseInt(
      databaseMaxConnectionsResult.rows[0].max_connections,
    ); // ESPECIFÍCA O VALOR DA QUERY PRÉ-ADQUIRIDO E O TRANSFORMA EM INTEIRO
    const openedConnections = databaseOpenedConnectionsResult.rows[0].count; // ESPECIFÍCA O VALOR DA QUERY PRÉ-ADQUIRIDO

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PARA ENCONTRAR O VALOR ESPECÍFICO DA QUERY PODE SER USADO O 'console.log' DEPOIS DE CADA CONSULTA EM 'database.query' NO BANCO DE DADOS //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // RETORNA A RESPOSTA EM JSON
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: versionDb,
          max_connections: maxConnections,
          opened_connections: openedConnections,
        },
      },
    });
  } catch (error) {
    console.error('Failed to execute database queries:', error);
    response.status(500).json({
      error: 'Database error',
      message: 'Failed to retrieve database status information'
    });
  }
}

export default status;
