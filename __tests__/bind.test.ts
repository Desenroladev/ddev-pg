
import { Bind } from '../src/bind';
describe('Testing Database Binds > ', () => {

    test('binds simple array', async () => {
        const bind = new Bind();
        
        let values = bind.toArray([
            'Jose Antoniel de Lima', 
            '2021-07-17', 
            '2021-07-17T09:34:17', 
            '09:12:45',
            {name: 'Java', time: '18:49:34'}
        ]);

        console.log(values);
    });


    test('binds simple object', async () => {
        const bind = new Bind();
        
        let values = bind.to({
            name: 'Jose Antoniel de Lima', 
            data: '2021-07-17', 
            data_start:'2021-07-17T09:34:17', 
            hour :'09:12:45',
            linguagem: {
                name: 'Java', 
                time: '18:49:34'
            },
            todos: [
                {hour_start:'10:17:45'},
                {hour_start:'12:17:45'},
            ]
        });

        console.log(values);
    });
    test('binds complex object', async () => {
        const bind = new Bind();
        
        let values = bind._to({
            nome: 'Jose Antoniel',
            enderecos : [
                {
                    rua: 'Perdigao de Oliveira',
                    numero: 283
                },
                {
                    rua: 'Campestre da Penha',
                    numero: 0
                }
            ],
            bairro: {
                nome: 'Parangaba'
            },
            emails : ['antonielliimma@gmail.com', 'ajinfotec@gmail.com']
        });

        console.log(JSON.stringify(values));
    });

});