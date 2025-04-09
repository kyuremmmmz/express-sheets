const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const router = require('./routers/Router');
const cors = require('cors');
const port = 3001;

app.use(cors({
    origin: ['http://localhost:3000', 'https://nextjs-portfolio-rho-virid.vercel.app', 'https://express-sheets-3.onrender.com/api/getResponses', 'https://nextjs-portfolio-5ald.vercel.app/'],
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'UPDATE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
}));



app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`PORT ${port} started successfully`);
});