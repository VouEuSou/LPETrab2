'use client'
import React from "react";
import Link from "next/link"
import AvalItem from "@/components/AvalItem"
import { useEffect, useState } from "react"



export default function Avaliacao(props) {
    const [avaliacoes, setAval] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [opcaoOrdenacao, setOpcaoOrdenacao] = useState('');
    useEffect(() => {
        async function getAval() {
            if (!props.avaliacao) {
                const response = await fetch("http://localhost:3000/avaliacoes/")
                const dados = await response.json()
                setAval(dados)
                setIsLoading(false)
            } else {
                const response = await fetch("http://localhost:3000/avaliacoes/" + props.avaliacao)
                const dados = await response.json()
                setAval(dados)
                setIsLoading(false)
            }

        }
        getAval()
    }, [props])

    const listReview = avaliacoes.map(avaliacao => (
        <AvalItem key={avaliacao.id}
            avaliacao={avaliacao}
        />
    ))

    return (
        <span>
            <div className="mb-3">
                <h1 className="h3 fw-normal mt-3 mb-3 text-center"><b>Avaliações</b></h1>
                {listReview}
            </div>
        </span>
    )
}