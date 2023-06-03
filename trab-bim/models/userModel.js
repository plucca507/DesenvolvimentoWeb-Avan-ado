const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: [true, "Por-favor preencha um código válido."],
        unique: true
    },
    nome: {
        type: String,
        required: [true, "Por-favor preencha um primeiro nome válido."]
    },
    sobrenome: {
        type: String,
        required: [true, "Por-favor preencha um sobrenome válido."]
    },
    imagem: { data: Buffer },
    nascimento: {
        type: Date,
        required: [true, "Por-favor preencha uma data de nascimento válida."]
    },
    telefone: String,
    endereco: String,
    cidade: String,
    estado: String,
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('users', userSchema);