const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    codigo: Number,
    descricao: String,
    quantidade: Number,
    valorUnitario: Number,
    desconto: Number,
    valorTotal: Number
});

module.exports = mongoose.model('Item', ItemSchema);
