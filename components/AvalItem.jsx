import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Coracoes from "./Coracoes"

export default function ItemLista(props) {
    const usuario = JSON.parse(localStorage.getItem("cliente_logado"))

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
                                <div className="text-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}