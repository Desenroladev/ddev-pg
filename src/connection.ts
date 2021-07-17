
import { PoolClient } from "pg";
import { DatabaseError } from "./database.error";
import SqlQuery from "./sql.query";

export class Connection {

    constructor(private client: PoolClient) {}

    async begin() : Promise<void> {
        try {
            await this.client.query('BEGIN');
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async commit(): Promise<void> {
        try {
            await this.client.query('COMMIT');
            await this.close();
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async rollback() {
        try {
            await this.client.query('ROLLBACK');
            await this.close();
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async query<T>(sql:string, binds:any = null) : Promise<T[]> {
        try {
            const query = new SqlQuery(sql, binds, this.client);
            const res = await query.execute();
            return res?.rows ? res.rows : null;
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async find<T>(sql:string, binds:any = null) : Promise<T> {
        try {
            const query = new SqlQuery(sql, binds, this.client);
            const res = await query.execute();
            return res?.rows?.length > 0 ? res.rows[0] : null;
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async execute<T>(sql:string, binds:any = null) : Promise<T> {
        try {
            const query = new SqlQuery(sql, binds, this.client);
            const res = await query.execute();
            return res?.rows?.length > 0 ? res.rows[0] : null;
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

    async close() : Promise<void> {
        try {
            await this.client.release();
        } catch(err) {
            throw new DatabaseError(err);
        }
    }

}
