import React, { useState, Fragment, useEffect } from 'react';
import api from '../../../services/api';
import { Redirect } from "react-router-dom";

import './Formulario.css';

export default function Formulario() {

    const [numero, setNumero] = useState(0);
    const [cliente, setCliente] = useState("");
    const [descricaoPedido, setDescricaoPedido] = useState("");
    const [situacaoPedido] = useState("Em análise");

    const [redirecionar, setRedirecionar] = useState(false);


    useEffect(() => {
        async function carregarPedidos() {
            const response = await api.get('/pedidos');
            setNumero(response.data.length + 1);
        }
        carregarPedidos();
    }, []);

    const [itens, setItens] = useState([
        { codigo: Number, descricao: String, quantidade: Number, valorUnitario: Number,
          desconto: Number, valorDesconto: 0, valorTotal: 0 }]);

    const handleItensChange = (index, event) => {
        const values = [...itens];
        if (event.target.name === "codigo") {
            const itens = values.filter(item => item.codigo === event.target.value);
            itens.length === 0 ? values[index].codigo = event.target.value : event.target.value = Number;
            values[index].codigo = event.target.value;
        } else if (event.target.name === "descricao") {
            values[index].descricao = event.target.value;
        } else if (event.target.name === "quantidade") {
            values[index].quantidade = event.target.value;
            if (values[index].desconto >= 0) {
                var totalSemDesontoQuantidade = values[index].quantidade * values[index].valorUnitario;
                var descontoQuantidade = (values[index].desconto / 100) * totalSemDesontoQuantidade;
                values[index].valorDesconto = descontoQuantidade;
                values[index].valorTotal = (totalSemDesontoQuantidade - descontoQuantidade)
                if (!Number.isNaN(descontoQuantidade)) {
                    values[index].valorDesconto = descontoQuantidade;
                    values[index].valorTotal = (totalSemDesontoQuantidade - descontoQuantidade)
                }
            }

        } else if (event.target.name === "valorUnitario") {
            values[index].valorUnitario = event.target.value;

            if (values[index].desconto >= 0) {
                var totalSemDesontoValorUnitario = values[index].quantidade * values[index].valorUnitario;
                var descontoValorUnitario = (values[index].desconto / 100) * totalSemDesontoValorUnitario;
                if (!Number.isNaN(descontoValorUnitario)) {
                    values[index].valorDesconto = descontoValorUnitario;
                    values[index].valorTotal = (totalSemDesontoValorUnitario - descontoValorUnitario);
                }
            }

        } else if (event.target.name === "desconto") {
            if (event.target.value >= 0 && event.target.value <= 100) {
                values[index].desconto = event.target.value;
                var desconto = (values[index].quantidade * values[index].valorUnitario) * (values[index].desconto / 100);
                values[index].valorDesconto = desconto
                values[index].valorTotal = ((values[index].quantidade * values[index].valorUnitario) - desconto);
                
            }
        }
        setItens(values);
    };

    const handleAddFields = () => {
        const values = [...itens];
        values.push({ codigo: Number, descricao: String, quantidade: Number, valorUnitario: Number,
            desconto: Number, valorDesconto: 0, valorTotal: 0 });
        setItens(values);
    };
    
    const handleRemoveFields = index => {
        const values = [...itens];
        values.splice(index, 1);
        setItens(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/pedidos', {
            'numero': numero,
            'cliente': cliente,
            'descricao': descricaoPedido,
            'situacao': situacaoPedido,
            'itens': itens
        }).then(() => setRedirecionar(true));
    }

    if (redirecionar) {
      return <Redirect to='/'/>;
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group col-sm-2">
                <label htmlFor="cliente">Pedido Nº</label>
                <input
                    type="text"
                    disabled={true}
                    className="form-control"
                    id="numero"
                    name="numero"
                    value={numero}
                    onChange={event => handleItensChange(event)} />
            </div>
            <div className="form-group col-sm-10">
                <label htmlFor="cliente">Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    id="cliente"
                    name="cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)} />
            </div>
            <div className="form-group col-sm-12">
                <label htmlFor="cliente">Descrição do pedido</label>
                <input
                    type="text"
                    className="form-control"
                    id="descricao"
                    name="descricao"
                    value={descricaoPedido}
                    onChange={e => setDescricaoPedido(e.target.value)} />
            </div>
        </div>
        <Divider/>
        <div className="form-row">
          {itens.map((item, index) => (
            <Fragment key={`${item}~${index}`}>
              <div className="form-group col-sm-2">
                <label htmlFor="codigo">Código</label>
                <input
                  type="number"
                  className="form-control"
                  id="codigo"
                  min={1}
                  name="codigo"
                  onChange={event => handleItensChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-10">
                <label htmlFor="descricao">Descrição do item</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="descricao"
                  name="descricao"
                  onChange={event => handleItensChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  type="number" 
                  className="form-control" 
                  id="quantidade"
                  name="quantidade"
                  onChange={event => handleItensChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="valorUnitario">Unitário (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="valorUnitario"
                  name="valorUnitario"
                  onChange={event => handleItensChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="desconto">Desconto (%)</label>
                <input
                  type="number" 
                  className="form-control" 
                  id="desconto"
                  min="0"
                  max="100"
                  name="desconto"
                  onChange={event => handleItensChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="valorTotal">Desconto (R$)</label>
                <input
                  type="number" 
                  className="form-control"
                  value={item.valorDesconto.toFixed(2)}
                  id="valorDesconto"
                  disabled={true}
                  name="valorDesconto"
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="valorTotal">Total (R$)</label>
                <input
                  type="number" 
                  className="form-control" 
                  id="valorTotal"
                  value={item.valorTotal.toFixed(2)}
                  disabled={true}
                  name="valorTotal"
                />
              </div>
              <div className="form-group col-sm-2" id="actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleRemoveFields(index)}>
                  -
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddFields()}>
                  +
                </button>
              </div>
              <Divider/>
            </Fragment>
          ))}
        </div>
        <input type="submit" value="Cadastrar pedido" className="btn btn-success" />
      </form>
    )
};

const Divider = () => {
    return (
      <div className="container">
        <div className="border" />
      </div>
    );
};
