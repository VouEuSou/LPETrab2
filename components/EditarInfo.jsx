'use client'
import React from "react";
import Link from "next/link"
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

export default function Botao(props) {
    const { clienteIsAdmin } = useContext(ClienteContext)
    return (    
    <div>
    { clienteIsAdmin &&
        <Link className="btn btn-success mx-2 float-end" href={`/modificar/${props.album.id}`} >Editar informações</Link>
        }
</div>
)
}