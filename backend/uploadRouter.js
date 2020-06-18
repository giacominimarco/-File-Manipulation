const router = require('express').Router();
const multer = require('multer');

const upload = multer({
    dest: 'upload_files/',
    fileFilter: (req, file, cb) => {
        if(file.mimetype != 'text/plain' && !file.mimetype.includes('log')){
            return cb(new Error('Formato de arquivo inválido.'));
        }
        cb(null, true);
    }
}).single('attachmente');

router.post('/', (req,res) => {
    upload(req, res, (err) => {
        if(err) {
            alert(err);
            res.send(422).send();
        }
    })
});

module.exports = router;