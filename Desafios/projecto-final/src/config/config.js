//@ts-check
import dotenv from 'dotenv';
import { Command } from 'commander';
import { logger } from '../utils/logger.js';

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
  logger.info('Entorno de desarrollo');
  dotenv.config({ path: `.env.development` });
} else if (mode === 'production') {
  dotenv.config({ path: `.env.production` });
} else {
  logger.error('Please specify a valid mode (development or production')
  process.exit(1);
}
logger.info(`${process.env.PERSISTENCE}`);


// Exportamos la configuración
export default {
  mode,
  dao,
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT
};
