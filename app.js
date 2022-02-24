const http = require('http');
const url = require('url');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const _ = require('lodash');
const moment = require('moment');
let citas = [];

const server = http.createServer( async (req, res) => {
 
    if(req.url.includes("/citas")){
        res.writeHead(200, {'Content-Type': 'text/html'})
        const data = await axios.get('https://randomuser.me/api')
        .then((data) => {

        const fechaRegistro = moment().format('MMM Do YYYY, h:mm:ss a');
        const id = uuidv4().slice(30)

        citas.push({
            nombre: data.data.results[0].name.first,
            apellido: data.data.results[0].name.last,
            id,
            time: fechaRegistro
        })
        res.write('<ol>')

        citas.forEach((cita) => {
            res.write(`<li>Nombre: ${cita.nombre} - Apellido: ${cita.apellido} - ID: ${cita.id} - Timestamp: ${cita.time}`)
        })

        console.log(_.defaults(citas));

        res.end()

        }).catch(e => {console.log(e)})
        
    }
        
})
server.listen(5000, () => console.log('Servidor arriba'));