const mongoose = require('mongoose')
const URL = 'mongodb://0.0.0.0:27017/catalogo'
const database = mongoose.connect(URL)
const conn = mongoose.connection;

conn.on('open', () => {
    console.log('Conectado ao MongoDB!')
})

conn.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB!', err)
})

conn.on('close', () => {
    console.log('Desconectado do MongoDB!')
})

module.exports = database;