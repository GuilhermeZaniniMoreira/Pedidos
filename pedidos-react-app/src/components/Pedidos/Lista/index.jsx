import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Table } from 'react-bootstrap';

export default function Lista() {

    const [ pedidos, setPedidos ] = useState([]);

    useEffect(() => {
        async function carregarPedidos() {
            const response = await api.get('/pedidos');
            setPedidos(response.data);
        }
        carregarPedidos();
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Nº do pedido</th>
                <th>Cliente</th>
                <th>Descrição</th>
                <th>Situação</th>
                </tr>
            </thead>
            <tbody>
                {
                    pedidos.map(pedido => (
                        <tr key={pedido._id}>
                        <td>{pedido.numero}</td>
                        <td>{pedido.cliente}</td>
                        <td>{pedido.descricao}</td>
                        <td>{pedido.situacao}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
};