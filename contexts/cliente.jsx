'use client'
import { createContext, useState } from "react"

export const ClienteContext = createContext()

function ClienteProvider({ children }) {

  let inicial_id = null
  let inicial_nome = ""
  let inicial_isAdmin = false
  let inicial_token = ""
  let inicial_email = ""

  if (localStorage.getItem("cliente_logado")) {
    const cliente = JSON.parse(localStorage.getItem("cliente_logado"))
    inicial_id = cliente.id
    inicial_nome = cliente.nome
    inicial_isAdmin = cliente.isAdmin
    inicial_token = cliente.token
    inicial_email = cliente.email

  }

  const [clienteId, setClienteId] = useState(inicial_id)
  const [clienteNome, setClienteNome] = useState(inicial_nome)
  const [clienteIsAdmin, setClienteIsAdmin] = useState(inicial_isAdmin)
  const [clienteToken, setClienteToken] = useState(inicial_token)
  const [clienteEmail, setClienteEmail] = useState("")

  function mudaId(id) {
    setClienteId(id)
  }

  function mudaNome(nome) {
    setClienteNome(nome)
  }

  function mudaIsAdmin(isAdmin) {
    setClienteIsAdmin(isAdmin)
  }

  function mudaToken(token) {
    setClienteToken(token)
  }

  function mudaEmail(email) {
    setClienteEmail(email)
  }

  return (
    <ClienteContext.Provider value={{ clienteId, clienteNome, mudaId, mudaNome, clienteIsAdmin, mudaIsAdmin, clienteToken, mudaToken, clienteEmail, mudaEmail }}>
      {children}
    </ClienteContext.Provider>
  )
}

export default ClienteProvider