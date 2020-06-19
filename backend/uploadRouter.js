const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const readline = require('readline');

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
    upload(req, res, (err) => {
        if(err) {
            console.log(err);
            res.send(422).send();
        }else {
            let file = req.file;
            processFile(file);
            res.send();
        }
    });
});


function processFile(File) {
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
    })

    // 1:34:00

}

module.exports = router;