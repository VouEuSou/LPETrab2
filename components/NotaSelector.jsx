'use client'
import { useForm } from "react-hook-form"
import { useState } from 'react';

function refreshPage() {
    window.location.reload(false);
}

async function alteraNota(data, album) {
    data = parseInt(data)

    if (album.soma == 1) {
        data = { ...album, soma: data }
    } else {
        const somaresult = album.soma + data
        console.log(somaresult)
        data = { ...album, soma: somaresult }
    }
    if (album.soma == album.num) {
        data.num = 1
    }
    else {
        data.num = album.num + 1
    }

    const response = await fetch("http://localhost:3004/albuns/" + album.id,
        {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data })
        },
    )
    if (response.status == 200) {
        alert("Album foi atualizado com sucesso!")
        refreshPage()
    } else {
        alert("Oops... Algo de errado não está certo")
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
            <label htmlFor="nota" className="form-label">Sua nota</label>
            <select className="form-select" id="nota" onChange={(e) => alteraNota(e.target.value, props.album)}  >
                <option value="select">Selecione</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </span>
    )
}