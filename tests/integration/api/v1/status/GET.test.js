// TESTE STATUS DA API
test("GET - api status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200); // Verifica se o status da resposta é 200

  // RECEBE O RETORNO JSON
  const responseStatus = await response.json();

  // VERIFICA O FORMATO DO UPDATE_AT EM ISO 8601
  const parsedUpdatedAt = new Date(responseStatus.updated_at).toISOString(); // Cria uma const que transforma este retorno OBJ em ISO 8601
  expect(responseStatus.updated_at).toEqual(parsedUpdatedAt); // Verifica se o retorno do JSON .status é igual ao ISO 8601
});

// TESTE DE DATABASE DEPENDENCIES NA API STATUS
test("GET - database deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // CRIA UMA CONSTANTE QUE RECEBE O RETORNO DA API

  const responseStatus = await response.json(); // 'responseStatus' RECEBE O RETORNO JSON

  // VERIFICA SE A DATABASE ESTÁ DISPONÍVEL
  expect(responseStatus.dependencies.database.version).toEqual("17.4"); // Verifica se a versão do banco de dados corresponde
  expect(responseStatus.dependencies.database.max_connections).toEqual(100); // Verifica se a versão do banco de dados está definida
  expect(responseStatus.dependencies.database.opened_connections).toEqual(1);
});
