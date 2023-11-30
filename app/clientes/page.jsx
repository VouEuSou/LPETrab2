"use client";
// pages/Charts.js
import React, { useEffect, useState } from "react";
import ClienteItem from "@/components/ClienteItem";

const Charts = () => {
  const [clientes, setClientes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [opcaoOrdenacao, setOpcaoOrdenacao] = useState('');
  useEffect(() => {
    async function getAval() {
      const response = await fetch("http://localhost:3000/usuarios/")
      const dados = await response.json()
      setClientes(dados)
      setIsLoading(false)
    }
    getAval()
  }, [])

  const listUsers = clientes.map(cliente => (
    <ClienteItem key={cliente.id}
      cliente={cliente}
    />
  ))

  return (
    <span>
      <div className="mb-3">
        <h1 className="h3 fw-normal mt-3 mb-3 text-center"><b>Clientes</b></h1>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          {listUsers}
        </div>
      </div>
    </span>
  )
}

export default Charts;
