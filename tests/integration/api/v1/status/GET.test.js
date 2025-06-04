test("GET - api status deve retornar 200", async () => {
   const response = await fetch("http://localhost:3001/api/v1/status") 
   expect(response.status).toBe(200);
});

