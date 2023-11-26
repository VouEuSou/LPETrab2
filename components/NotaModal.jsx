'use client'
import { useForm } from "react-hook-form"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"


async function enviaDados(data, cliente, albumId) {
    const dados = {
        "album_id": albumId,
        "email": cliente.email,
        "nome": cliente.nome,
        "comentario": data.comentario,
        "nota": parseInt(data.nota)
    };
    console.log(dados)
    const album = await fetch("http://localhost:3000/avaliacoes",
        {
            method: "POST",
            headers: { "Content-type": "application/json", "Authorization": `${cliente.token}` },
            body: JSON.stringify({ ...dados })
        },
    )
    if (album.status == 201) {
        toast.success("Avaliação cadastrada com sucesso")
        window.location.reload()
    } else {
        toast.error("Não foi possível concluir o cadastro")
    }
}
export default function ModalAvaliacao(props) {
    const cliente = JSON.parse(localStorage.getItem("cliente_logado"))
    const { register, handleSubmit } = useForm()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
        enviaDados(data, cliente, props.album.id);
        handleClose()
    }

    return (
        <span>
            <Button variant="dark" onClick={handleShow}>
                Avaliar álbum
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova avaliação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nota:</p>
                    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                        <select className="form-select my-3" {...register('nota')} name="nota">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <p>Comentário:</p>
                        <textarea className="form-control my-3" {...register('comentario')} name="comentario" rows="3" placeholder="Deixe seu comentário"></textarea>
                        <div className="text-end">
                            <input type="submit" value="Enviar" className="btn btn-dark me-3" />
                        </div>
                    </form>
                </Modal.Body>
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
    )
}
