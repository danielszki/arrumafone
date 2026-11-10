import app from "./app.js";
import { logger } from "./lib/logger.js";
import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carrega variáveis de ambiente de .env.development apenas em ambiente
// local (desenvolvimento). Em produção (Vercel) as variáveis são definidas
// no painel do projeto e este bloco é ignorado.
if (process.env.NODE_ENV !== "production") {
  dotenvConfig({ path: path.resolve(__dirname, "..", ".env.development") });
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
