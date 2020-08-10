const { Schema, model } = require('mongoose');

const PedidoSchema = new Schema({
    numero: Number,
    descricao: String,
    situacao: String,
    itens: [{
        'codigo': Number,
        'descricao': String,
        'quantidade': Number,
        'valorUnitario': Number,
        'desconto': Number,
        'valorTotal': Number
    }]
}, {
    timestamps: true
});

module.exports = model('Pedido', PedidoSchema);
