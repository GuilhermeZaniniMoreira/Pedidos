import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Table } from 'react-bootstrap';
import { useLocation } from "react-router";

export default function Lista() {

    const [pedido, setPedido] = useState([]);
    let location = useLocation();
    const [id] = useState(location.state.id);

    useEffect(() => {
        async function carregarPedido() {
            const response = await api.get(`/pedido/${id}`);
            setPedido(response.data);
        }
        carregarPedido();
    }, [id]);

    return (
        <>
        <div className="dados">
            <p>Nº do pedido: {pedido.numero}</p>
            <p>Cliente: {pedido.cliente}</p>
            <p>Descrição: {pedido.descricao}</p>
            <p>Data: {new Date(pedido.createdAt).getDate()}/{new Date(pedido.createdAt).getMonth() + 1}/{new Date(pedido.createdAt).getFullYear()}</p>
            <p>Horário: {new Date(pedido.createdAt).getHours()}:{new Date(pedido.createdAt).getMinutes()}</p>
        </div>
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Desconto</th>
                <th>Valor Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    pedido.itens !== undefined ?
                    pedido.itens.map((item, index) => (
                        <tr key={index}>
                            <td>{item.codigo}</td>
                            <td>{item.descricao}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.valorUnitario}</td>
                            <td>{item.desconto}%</td>
                            <td>{(item.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                    )) : 
                    <tr>
                        <td>Carregando...</td>
                    </tr>
                }
            </tbody>
        </Table>
        </div>
        </>
    )
};