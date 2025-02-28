import { neon } from '@neondatabase/serverless';
import exp from 'constants';
async function getDbConnection() {
    if(!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
  const sql = neon(process.env.DATABASE_URL);
    return sql;
 
  
}
export default getDbConnection;