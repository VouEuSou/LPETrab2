import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Coracoes from "./Coracoes"
import React, { useState } from 'react';
import DeleteAvalModal from './DeleteAvalModal';
import Button from 'react-bootstrap/Button';


export default function ItemLista(props) {
    const usuario = JSON.parse(localStorage.getItem("cliente_logado"))
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <div style={{ maxWidth: "800px" }} className="card mx-auto mb-3">
            <div className="row g-0">
                <div className="col">
                    <div className="card-body d-flex justify-content-between">
                        <div>
                            <h5 className="card-title">Nome: {props.avaliacao.nome}</h5>
                            <p className="card-text">Comentario: {props.avaliacao.comentario}</p>
                        </div>
                        <div>
                            <Coracoes media={props.avaliacao.nota} />
                            {usuario.isAdmin &&
                                <DeleteAvalModal avaliacao={props.avaliacao} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}