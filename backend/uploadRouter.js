const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const readline = require('readline');
const { once } = require('events');//captura um determinado evento usando o pacote 'events'
const { on } = require('process');

// cria e armazena os arquivo enviados para 'upload_files/'
// verifica se os arquivos em anexo estão no formato text/pllain e log;
const upload = multer({
    dest: 'upload_files/',
    fileFilter: (req, file, cb) => {
        if(file.mimetype != 'text/plain' && !file.mimetype.includes('log')){
            return cb(new Error('Formato de arquivo inválido.'));
        }
        cb(null, true);
    }
}).single('attachment');

// tratamento do erro e envio do arquivo
router.post('/', (req,res) => {
    upload(req, res, async (err) => { //acrescentado um async, caso contrario o await não funciona
        if(err) {
            console.log(err);
            res.send(422).send();
        }else {
            let file = req.file;
            const path = await processFile(file);
            if (path){
                res.download(path, file.originalname);
            }else{
                res.status(500).send();
            }
            res.send();
        }
    });
});

//Transformei numa função async por causa do {once} linha 5
async function processFile(File) {
    const outpath = `${process.env.OUTDIR}/${file.filename}`;
    const writeStream = fs.createWriteStream(outpath, {
        flags: 'a'
    });
    
    // retorna caso tenha erro de escrita, não foi posivel desofuscar
    writeStream.on('error', (err) => {
        console.log(err);
        throw err;
    })

    const readInterface = readline.createInterface({
        input: fs.createReadStream(file.path)
    });

    // imprime linha a linha o arquivo desofuscado
    readInterface.on('line', (line) => {
        writeStream.write(`${line.toUpperCase()}\n`)
    });

    readInterface.on('close', () => {
        WriteStream.end();
    });

    await once(readInterface, 'close');

    return outpath;

}

module.exports = router;