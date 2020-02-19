const express = require('express');
const server = express();

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true}));

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: 'asbiredebob123',
    host: 'localhost',
    port: 5432,
    database: 'donation'
})

const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: server,
    noCache: true,
})

server.get('/', (req, res) =>{
    db.query(`SELECT * FROM donors`, (err, result) =>{
        if(err) return res.send('Erro no banco de dados.')

        const donors = result.rows;
        return res.render('index.html', { donors });
    })
    
})

server.post('/', (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if(name == '' || email == '' || blood == ''){
        return res.send('Preencha todos os campos.');
    };

    const query = `INSERT INTO donors("name", "email", "blood") VALUES ($1, $2, $3)`;

    db.query(query, [name, email, blood], (err) => {
        if (err) res.send('Erro no banco de dados.');

        return res.redirect('/');
    });
})

server.listen(3001);