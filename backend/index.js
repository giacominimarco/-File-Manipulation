const express = require('express')
const cors = require('cors')

const uploadRouter = require('./uploadRouter');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/upload',uploadRouter);

app.listen(port, () => console.log('Servidor Ligado'))