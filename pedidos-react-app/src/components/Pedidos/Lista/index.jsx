import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Table, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './Lista.css';

export default function Lista() {

    const [pedidos, setPedidos] = useState([]);
    const [atualizar, setAtualizar] = useState(false);

    useEffect(() => {
        async function carregarPedidos() {
            const response = await api.get('/pedidos');
            setPedidos(response.data);
        }
        carregarPedidos();
        setAtualizar(false);
    }, [atualizar]);

    const handleAprovar = (id) => {
        api.put('/alterar', {
            'id': id,
            'situacao': 'Aprovado'
        }).then(() => setAtualizar(true));
    }

    const handleCancelar = (id) => {
        api.put('/alterar', {
            'id': id,
            'situacao': 'Cancelado'
        }).then(() => setAtualizar(true));
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Nº do pedido</th>
                <th>Cliente</th>
                <th>Descrição</th>
                <th>Situação</th>
                <th>Visualizar</th>
                <th>Aprovar</th>
                <th>Cancelar</th>
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
                        <td>
                            <Link to={{ pathname: `/pedido/${pedido._id}`, state: { id: pedido._id} }}>
                                <Button variant="primary">Visualizar</Button>
                            </Link>
                        </td>
                        <td>
                            <Button variant="success" onClick={(e) => handleAprovar(pedido._id)}>Aprovar</Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={(e) => handleCancelar(pedido._id)}>Cancelar</Button>
                        </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
};