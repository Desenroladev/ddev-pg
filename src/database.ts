
import dotenv from 'dotenv';
import moment from 'moment';
import {Pool, PoolClient, types} from 'pg';
import { Connection } from './connection';

const parseFn = (val: string) => {
   return val === null ? null : moment(val).format();
};
types.setTypeParser(types.builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(types.builtins.TIMESTAMP, parseFn);

export class Database {
    
    private pool: Pool;

    constructor() {
        const config = {...dotenv.config().parsed};

        this.pool = new Pool({
            user: config.DB_USER,
            host: config.DB_HOST,
            database: config.DB_DATABASE,
            password: config.DB_PASSWORD,
            port: parseInt(config.DB_PORT)
        });
    }

    async getConnection() : Promise<Connection> {
        const client = await this.pool.connect();
        return new Connection(client);
    }

    async transaction() : Promise<Connection> {
        const client = await this.pool.connect();
        const connection = new Connection(client);
        await connection.begin();

        return connection;
    }

    async query<T>(sql:string, binds : any[] = null, connection: Connection = null): Promise<T[]> {
        
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

    async find<T>(sql:string, binds : any[] = null, connection: Connection = null): Promise<T> {
        const res = await this.query<T>(sql, binds, connection);
        return res[0];
    }

    async execute<T>(sql:string, binds : any[] = null, connection: Connection = null): Promise<T> {
        const res = await this.query<T>(sql, binds, connection);
        return res[0];
    }

}

export default Database;
