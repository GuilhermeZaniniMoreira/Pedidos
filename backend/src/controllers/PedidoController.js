const Pedido = require('../models/Pedido.js');

module.exports = {
    async index(request, response) {
        const pedidos = await Pedido.find();
        return response.json(pedidos);
    },
    async show(request, response) {

        const { id } = request.params;
        const pedido = await Pedido.findById(id);
        return response.json(pedido);

    },
    async store(request, response) {

        const { numero, cliente, descricao, situacao, itens } = request.body;

        let pedido = await Pedido.create({
            numero,
            cliente,
            descricao,
            situacao,
            itens
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
