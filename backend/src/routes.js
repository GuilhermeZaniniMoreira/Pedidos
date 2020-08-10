const { Router } = require('express');
const PedidoController = require('./controllers/PedidoController');
const routes = Router();

routes.get('/pedidos', PedidoController.index);
routes.post('/adicionarPedido', PedidoController.store);
routes.put('/alterarSituacao', PedidoController.update);

module.exports = routes;
