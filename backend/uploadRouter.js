const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const readline = require('readline');
const { once } = require('events');//captura um determinado evento usando o pacote 'events'

// Restrição de arquivos'
const upload = multer({
    dest: 'upload_files/',
    fileFilter: (req, file, cb) => {
        if(file.mimetype != 'text/plain' && !file.mimetype.includes('log')){
            return cb(new Error('Formato de arquivo inválido.'));
        }
        cb(null, true);
    }
}).single('attachment');

// processamento do arquivo
router.post('/', (req,res) => {
    upload(req, res, async (err) => { //acrescentado um async, caso contrario o await não funciona
        if(err) { // se der erro
            console.log(err);
            res.status(422).send();
        }else { // se der certo
            let file = req.file;
            const path = await processFile(file);
            if (path){
                // para o usuário receber o arquivo desofuscado
                res.download(path, file.originalname);
            }else{
                res.status(500).send();
            }
            res.send();
        }
    });
});

//Transformei numa função async por causa do {once} linha 5
async function processFile(file) {
    const outpath = `${process.env.OUTDIR}/${file.filename}`;

    // Escreve linha a linha 
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
    // aqui que será feito o desofuscamento
    readInterface.on('line', (line) => {
        writeStream.write(`${line.toUpperCase()}\n`)
    });

    // fecha apos leitura do arquivo
    readInterface.on('close', () => {
        writeStream.end();
    });

    // aguarda ler todo o arquivo antes de fechar
    await once(readInterface, 'close');

    return outpath;

}

module.exports = router;