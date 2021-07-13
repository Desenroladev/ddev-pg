import { PoolClient } from "pg";

export class Connection {

    constructor(private client: PoolClient) {
    }

    async begin() {
        await this.client.query('BEGIN');
    }

    async commit(): Promise<void> {
        await this.client.query('COMMIT');
        await this.close();
    }

    async rollback() {
        await this.client.query('ROLLBACK');
        await this.close();
    }

    async query<T>(sql:string, binds:any[] = null) : Promise<T[]> {
        const res = await this.client.query(sql, binds);
        return res.rows;
    }

    async find<T>(sql:string, binds:any[] = null) : Promise<T> {
        const res = await this.client.query(sql, binds);
        return res.rows[0];
    }

    async execute<T>(sql:string, binds:any[] = null) : Promise<T> {
        const res = await this.client.query(sql, binds);
        return res.rows[0];
    }

    async close() {
        await this.client.release();
    }

}
