const Item = require('../models/Item.js')

module.exports = {
    async index(request, response) {
        const items = await Item.find();
        return response.json(items);
    },
    async store(request, response) {

        const { codigo, descricao, quantidade,
                valorUnitario, desconto, valorTotal } = request.body;

        // verifica se já existe um item no bando de dados
        let item = await Item.findOne({ codigo });

        if (!item) {
            item = await Item.create({
                codigo,
                descricao,
                quantidade,
                valorUnitario,
                desconto,
                valorTotal
            })
        }
        response.json(item);
    }
} 
