const Pedido = require('../models/Pedido.js');

module.exports = {
    async index(request, response) {
        const pedidos = await pedidos.find();
        return response.json(pedidos);
    },
    async store(request, response) {

        const { numero, dataPedido, descricao,
                situacao } = request.body;

        const pedido = await Pedido.create({
            numero,
            dataPedido,
            descricao,
            situacao
        });

        response.json(pedido);

    }, async update(request, response) {

        const { id, situacao } = request.body;

        const filtro = { _id: id };
        const situacaoUpdate = { situacao: situacao };

        const pedido = await Pedido.findOneAndUpdate(filtro, situacaoUpdate);
        response.json(pedido);
    }
}
