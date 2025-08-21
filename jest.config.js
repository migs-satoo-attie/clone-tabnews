const dotenv = require("dotenv"); // Por padrão o next/jest em variaveis de ambiente não localiza .development
dotenv.config({
  path: ".env.development", //config dotenv
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig();
