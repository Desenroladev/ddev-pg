import { PoolClient } from "pg";
import Bind from "./bind";

export class SqlQuery {

  constructor(private sql:string, private values:any, private client: PoolClient) {}

  replaceNamedParameters(sql:string, values:any) {
    let i: number = 1;
    return sql.replace(/:+(?!\d)(\w+)/g, (value, key) => {
      if ('::' === value.slice(0, 2)) {
        return value;
      }
  
      if (values[key] !== undefined) {
        return `$${i++}`;
      }
      throw new Error(`Named parameter "${value}" has no value in the given object.`);
    });
  }

  _binds(binds: any) {
    if(!binds) return binds;
    const bind = new Bind();
    const json = bind.json(bind.to(binds));
    return json;
  }

  toSql() : string {
    return this.replaceNamedParameters(this.sql, this.values)
  }

  toBinds() : any {
    return this._binds(this.values);
  }

  async execute(): Promise<any> {
    return await this.client.query(this.toSql(), this.toBinds());
  }

}

export default SqlQuery;
