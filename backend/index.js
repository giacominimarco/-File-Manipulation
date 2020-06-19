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
fs.access(process.env.OUTDIR, fs.constants.F_OK, (err) => {
    if(err) {
        fs.mkdir(process.env.OUTDIR, (err) => {
            if(err) throw err;
            console.log(`${process.env.OUTDIR} criado com sucesso! `)
        })
    }else {
        fs.stat(process.env.OUTDIR, (err, stats) => {
            if(err) throw err;
            if(!stats.isDirectory()) {
                throw new Error(`${process.env.OUTDIR} existe e não é um diretório`)
            }
        });
    }
})

app.listen(port, () => console.log('Servidor Ligado'))