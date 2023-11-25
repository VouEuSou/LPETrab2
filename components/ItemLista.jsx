import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
import Coracoes from "./Coracoes"

export default function ItemLista(props) {
    const { clienteId } = useContext(ClienteContext)

    return (
        <div className="col-md-2 mb-4">
            <Card>
                {clienteId &&
                    <Link href={`visualizar/${props.album.id}`}>
                        <div className="text-center mb-2">
                            <Card.Img
                                variant="top"
                                src={props.album.capa}
                                alt={`${props.album.nome}`}
                                style={{
                                    maxWidth: '300px',
                                    margin: 'auto',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                    </Link>
                }
                {!clienteId &&

                    <div className="text-center mb-2">
                        <Card.Img
                            variant="top"
                            src={props.album.capa}
                            alt={`${props.album.nome}`}
                            style={{
                                maxWidth: '300px',
                                margin: 'auto',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                }

                {clienteId &&
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} href={`visualizar/${props.album.id}`}>
                        <Card.Body>
                            <Card.Title style={{ marginBottom: '1rem', fontSize: 27 }}>{props.album.nome}</Card.Title>
                            <Card.Text style={{ marginBottom: '0.2rem' }}>
                                Artista: {props.album.artista}
                            </Card.Text>
                            <Card.Text style={{ marginBottom: '0.2rem' }}>
                                Gênero: {props.album.genero}
                            </Card.Text>
                            <Card.Text style={{ marginBottom: '0.2rem' }}>
                                Nota: {props.album.media_notas}
                            </Card.Text>
                            <Card.Text style={{ marginBottom: '0.0rem', paddingBottom: '0.2rem' }}>
                                <Coracoes media={props.album.media_notas} />
                            </Card.Text>
                            <Card.Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                                Preço: R$ {props.album.preco},00
                            </Card.Text>
                        </Card.Body>
                    </Link>}

                {!clienteId &&
                    <Card.Body>
                        <Card.Title style={{ marginBottom: '1rem', fontSize: 27 }}>{props.album.nome}</Card.Title>
                        <Card.Text style={{ marginBottom: '0.2rem' }}>
                            Artista: {props.album.artista}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: '0.2rem' }}>
                            Gênero: {props.album.genero}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: '0.0rem', paddingBottom: '0.2rem' }}>
                            <Coracoes media={props.album.media_notas} />
                        </Card.Text>
                        <Card.Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                            Preço: R$ {props.album.preco},00
                        </Card.Text>
                    </Card.Body>}
            </Card>
        </div>


    )
}