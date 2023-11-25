import React from 'react';
import { Modal, Button } from 'react-bootstrap';


async function deleteAval(data) {
    const album = await fetch("http://localhost:3000/usuarios",
        {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data })
        },
    )
    if (album.status == 201) {
        toast.success("Cadastro realizado com sucesso")
        reset()
    } else {
        console.log(album.status)
        if (album.status == 405) {
            toast.error("⚠️ Sua senha precisa de no mínimo 10 caracteres, sendo minúsculas, maiúsculas, números e símbolos")
        } else if (album.status == 404) {
            toast.error("⚠️ Dados inválidos")
        } else if (album.status == 410) {
            toast.error("⚠️ E-mail já cadastrado")
        } else {
            toast.error(`${album.status.msg}`)
        }
    }
}

export default function ModalDelete(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
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
    );
};
