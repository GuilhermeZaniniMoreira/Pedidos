const { Router } = require('express');
const PedidoController = require('./controllers/PedidoController');
const routes = Router();

routes.get('/pedidos', PedidoController.index);
routes.get('/pedido/:id', PedidoController.show);
routes.post('/pedidos', PedidoController.store);
routes.put('/alterar', PedidoController.update);

module.exports = routes;
