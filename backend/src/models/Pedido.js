const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema({
    numero: Number,
    dataPedido: Date,
    descricao: String,
    situacao: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
    
});

module.exports = mongoose.model('Pedido', PedidoSchema);
