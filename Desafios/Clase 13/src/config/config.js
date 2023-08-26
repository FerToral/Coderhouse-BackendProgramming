import detenv from 'detenv';

detenv.config();

export default {
    persistence: process.env.PERSISTENCE
}