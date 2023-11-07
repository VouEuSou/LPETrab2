'use client'
import React from "react";
import Link from "next/link"
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

export default function Botao(props) {
    const { clienteIsAdmin } = useContext(ClienteContext)
    return (
        <span>
            {clienteIsAdmin &&
                <Link className="btn btn-warning mx-2 float-end" href={`/modificar/${props.album.id}`} >Editar informações</Link>
            }
        </span>
    )
}