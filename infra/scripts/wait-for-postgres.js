const { exec } = require("node:child_process");

function waitForPostgres() {
  exec("docker exec recipay-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      waitForPostgres();
      return;
    }

    console.log("\n ✅ Postgres está pronto para conexões! \n");
  }
}

process.stdout.write("\n \n ⭕ Aguardando Postgres aceitar conexões TCP/IP");
waitForPostgres();
