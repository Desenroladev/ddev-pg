import moment from "moment";
import { PoolClient } from "pg";

export class Connection {

    constructor(private client: PoolClient) {
    }

    async begin() : Promise<void> {
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

    mapBinds(binds: any[]) {
        
        if(!binds) return binds;

        return binds.map(bind => {
                    if(moment(bind).isValid()) {
                        return bind.substring(0, 19) + (process.env.DB_UTC || '-00:00');
                    }
                    return bind;
                });
    }

    async query<T>(sql:string, binds:any[] = null) : Promise<T[]> {
        const res = await this.client.query(sql, this.mapBinds(binds));
        return res.rows;
    }

    async find<T>(sql:string, binds:any[] = null) : Promise<T> {
        const res = await this.client.query(sql, this.mapBinds(binds));
        return res.rows[0];
    }

    async execute<T>(sql:string, binds:any[] = null) : Promise<T> {
        const res = await this.client.query(sql, this.mapBinds(binds));
        return res.rows[0];
    }

    async close() : Promise<void> {
        await this.client.release();
    }

}
