'use client'
import { useForm } from "react-hook-form"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

async function alteraDados(data) {
    const response = await fetch("http://localhost:3004/albuns/" + params.id,
        {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data })
        },
    )
    if (response.status == 200) {
        toast.success("Album foi atualizado com sucesso!")
    } else {
        toast.error("Oops... Algo de errado não está certo")
    }
}

export default function ModalAvaliacao(props) {
    const { register, handleSubmit } = useForm()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(props.album.id)
    return (
        <span>
            <Button variant="success" onClick={handleShow}>
                Avaliar álbum
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dê sua nota ao álbum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-select my-3" id="nota">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Salvar nota
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    )
}