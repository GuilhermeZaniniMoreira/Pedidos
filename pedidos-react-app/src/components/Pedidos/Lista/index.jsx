import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

export default function Lista() {

    const [ pedidos, setPedidos ] = useState([]);

    useEffect(() => {
        async function carregarPedidos() {
            const response = await api.get('/pedidos');
            setPedidos(response.data);
        }
        carregarPedidos();
    });

    return (
        <div>
            <h1></h1>
        </div>
    )
};