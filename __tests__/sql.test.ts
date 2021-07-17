
import { SqlQuery } from '../src/sql.query';
describe('Testing Database SQL > ', () => {
    test('binds complex object', async () => {
        
        let values = {
            nome: 'Jose Antoniel',
            enderecos: [
                {
                    rua: 'Perdigao de Oliveira',
                    numero: 283
                },
                {
                    rua: 'Campestre \'da Penha43#$%@!`',
                    numero: 0
                }
            ],
            bairro: {
                nome: 'Parangaba'
            },
            emails: ['antonielliimma@gmail.com', 'ajinfotec@gmail.com']
        };

        const sql = new SqlQuery();
        console.log(sql.replaceNamedParameters('select :nome, :emails::jsonb, :bairro::jsonb, :enderecos::jsonb', values));
    });

});