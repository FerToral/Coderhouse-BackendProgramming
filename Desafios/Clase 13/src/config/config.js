//@ts-check
import dotenv from 'dotenv';
import { Command } from 'commander';
import { __dirname } from '../utils/utils.js';
// Inicializamos el programa Commander
export const program = new Command();

program
  .option('--mode <mode>', 'Modo de trabajo', 'PROD')
  .option('--dao <dao>', 'Persistencia', 'mongo')
  .parse(process.argv);

// Obtenemos el modo y el DAO seleccionados
const mode = program.mode;
const dao = program.dao;

// Cargamos las variables de entorno según el modo
if (mode === 'DEV') {
  dotenv.config({ path: `${__dirname}/.env.development` });
} else if (mode === 'PROD') {
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
