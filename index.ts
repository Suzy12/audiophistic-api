import express from 'express';
import Controlador from './src/controlador';

const app = express();

let controlador = new Controlador("Hola"); 

app.get('/', (req, res) => {
    res.send('Lol!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})