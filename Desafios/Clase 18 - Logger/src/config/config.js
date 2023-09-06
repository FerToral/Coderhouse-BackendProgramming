//@ts-check
import dotenv from 'dotenv';
import { Command } from 'commander';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
// Inicializamos el programa Commander
export const program = new Command();

program
  .option('--mode <mode>', 'Modo de trabajo', 'development')
  .option('--dao <dao>', 'Persistencia', 'mongo')
  
program.parse();

// Obtenemos el modo y el DAO seleccionados
const mode = program.opts().mode;
const dao = program.opts().dao;

// Cargamos las variables de entorno según el modo
if (mode === 'development') {
  dotenv.config({ path: `${__dirname}/.env.development` });
} else if (mode === 'production') {
  dotenv.config({ path: `${__dirname}/.env.production` });
} else {
  console.error('Please specify a valid mode (development or production)');
  process.exit(1);
}

// Exportamos la configuración
export default {
  mode,
  dao,
  persistence: process.env.PERSISTENCE,
};
