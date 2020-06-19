const express = require('express')
const cors = require('cors')
const fs = require('fs');

require('dotenv').config();

const uploadRouter = require('./uploadRouter');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/upload',uploadRouter);

// verifica se o arquivo ou diretório já existem
fs.access(process.env.OUTPUT, fs.constants.F_OK, (err) => {
    if(err) {
        fs.mkdir(process.env.OUTPUT, (err) => {
            if(err) throw err;
            console.log(`${process.env.OUTPUT} criado com sucesso! `)
        })
    }else {
        fs.stat(process.env.OUTPUT, (err, stats) => {
            if(err) throw err;
            if(!stats.isDirectory()) {
                throw new Error(`${process.env.OUTPUT} existe e não é um diretório`)
            }
        });
    }
})

app.listen(port, () => console.log('Servidor Ligado'))