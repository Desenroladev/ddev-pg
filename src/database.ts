
import dotenv from 'dotenv';
import {Pool, types} from 'pg';
import { Connection } from './connection';
import { DatabaseError } from './database.error';
import TimestampTzParser from './timestamptz.parser';
import TimeTzParser from './timetz.parser';
import DateParser from './date.parser';
import TimestampParser from './timestamp.parser';
import TimeParser from './time.parser';
import DatabaseOptions from './database.options';

types.setTypeParser(types.builtins.DATE, DateParser.execute);
types.setTypeParser(types.builtins.TIMESTAMP, TimestampParser.execute);
types.setTypeParser(types.builtins.TIMESTAMPTZ, TimestampTzParser.execute);
types.setTypeParser(types.builtins.TIME, TimeParser.execute);
types.setTypeParser(types.builtins.TIMETZ, TimeTzParser.execute);

export class Database {
    
    private pool: Pool;

    constructor(options: DatabaseOptions = null) {

        if(!options) {
            const env = {...dotenv.config().parsed};
            options = {
                user: env.DB_USER,
                host: env.DB_HOST,
                database: env.DB_DATABASE,
                password: env.DB_PASSWORD,
                port: parseInt(env.DB_PORT)
            }
        }

        this.pool = new Pool(options);
    }

    async getConnection() : Promise<Connection> {
        try {
            const client = await this.pool.connect();
            return new Connection(client);
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async transaction() : Promise<Connection> {
        try {
            const client = await this.pool.connect();
            const connection = new Connection(client);
            await connection.begin();
            return connection;
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async query<T>(sql:string, binds : any = null, connection: Connection = null): Promise<T[]> {
        
        let isNullConnection = false;
        if(!connection) {
            connection = await this.getConnection();
            isNullConnection = true
        }

        let res = null;
        try {
            res = await connection.query<T>(sql, binds);
        } finally {
            if(isNullConnection) {
                connection.close();
            }
        }
        return res;
    }

    async find<T>(sql:string, binds : any = null, connection: Connection = null): Promise<T> {
        const res = await this.query<T>(sql, binds, connection);
        return res[0];
    }

    async execute<T>(sql:string, binds : any = null, connection: Connection = null): Promise<T> {
        const res = await this.query<T>(sql, binds, connection);
        return res[0];
    }

}

export default Database;
