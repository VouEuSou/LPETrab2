'use client'
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
let avalid = 0

async function deleteAval(data) {
    const usuario = JSON.parse(localStorage.getItem("cliente_logado"))
    const avaliacao = await fetch("http://localhost:3000/avaliacoes/" + avalid,
        {
            method: "DELETE",
            headers: { "Content-type": "application/json", "Authorization": `${usuario.token}` },

        },
    )
    if (avaliacao.status == 200) {
        toast.success("Avaliação deletada com sucesso!")
        window.location.reload()
    } else {
        if (avaliacao.status == 400) {
            toast.error("Erro ao deletar avaliação")
        }
    }
}

export default function ModalDelete(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    avalid = props.avaliacao.id
    return (
        <span>
            <div className="text-end">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} width="20" height="20" onClick={handleShow} fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja excluir esta avaliação?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteAval}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </span>
    );
};