import { Connection, Database } from "../src";

describe('Testing Database Connection > ', () => {
    test('findAll records', async () => {
        const sql = `select 
                        id, 
                        title, 
                        created_at,
                        concluded,
                        concluded_at,
                        date_start,
                        hours,
                        _timestamp,
                        hora
                    from todo_dev`;

        const db = new Database({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'ddev',
            database: 'ddev'
        });
        const rows = await db.query(sql);

        console.log(rows);
    });
  
    test('insert record', async() => {
        const db = new Database();
        let connection: Connection = null;
        try {
            connection = await db.transaction();
            const binds = {
                title: 'Teste Automatizado',
                concluded_at: '2021-07-17T09:34:17',
                date_start: '2021-07-17',
                hours: '09:12:45',
                _timestamp: '2021-07-17T09:34:17',
                hora: '18:10:34'
            };
            const sql = `insert into todo_dev(title, concluded_at, date_start, hours,_timestamp, hora) 
                            values(:title, :concluded_at, :date_start, :hours, :_timestamp, :hora) 
                            returning *`;
            const res = await connection.execute(sql, binds);
            await connection.commit();
        } catch(err) {
            console.log(err.stack);
            if(connection) {
                await connection.rollback();
            }
            throw err;
        }
    });



    test('insert record dmlapi merge', async() => {
        const db = new Database();
        let connection: Connection = null;
        try {
            connection = await db.transaction();
            const binds = {
                payload: {
                    title: 'Teste Automatizado',
                    concluded_at: '2021-07-17T09:34:17',
                    date_start: '2021-07-17',
                    hours: '09:12:45',
                    _timestamp: '2021-07-17T09:34:17',
                    hora: '18:10:34'
                }
            };
            const sql = `select t.* from public.dmlapi_todo_merge(:payload::jsonb) t`;
            const res = await connection.execute(sql, binds);
            await connection.commit();
        } catch(err) {
            console.log(err.stack);
            if(connection) {
                await connection.rollback();
            }
            throw err;
        }
    });


    test('select DML API', async () => {
        const sql = `select 
                        column_name, 
                        ordinal_position,
                        data_type,
                        udt_name,
                        character_maximum_length,
                        numeric_precision,
                        is_nullable,
                        column_default 
                    from information_schema.columns 
                    where table_name = $1
                        and table_schema = $2
                        and table_catalog = $3
                    order by ordinal_position`;

        const db = new Database();
        const rows = await db.query(sql, ['todo', 'public', 'ddev']);

        console.log(rows);
    });

});