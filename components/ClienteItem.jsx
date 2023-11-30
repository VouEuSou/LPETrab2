import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Coracoes from "./Coracoes"
import React, { useState } from 'react';
import DeleteAvalModal from './DeleteAvalModal';


export default function ItemLista(props) {
    let clienteAdm = "Não"
    if (props.cliente.isAdm == 1) {
        clienteAdm = "Sim"
    }
    return (
        <div style={{ maxWidth: "400px" }} className="card mx-2 mb-3">
            <div className="card-body justify-content-between">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">Nome: {props.cliente.nome}</h5>
                        <span className="card-text">
                            E-mail: {props.cliente.email}<br />
                            Administrador: {clienteAdm}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}