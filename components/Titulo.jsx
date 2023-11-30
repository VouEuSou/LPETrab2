'use client'
import Link from "next/link";
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
import './font.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';


export default function Titulo() {
  const { clienteNome, mudaId, mudaNome, clienteIsAdmin } = useContext(ClienteContext)

  function logout() {
    toast.warning("Logout realizado")
    mudaId(null)
    mudaNome("")
    localStorage.removeItem("cliente_logado")
  }


  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="col">
          <Link href="/">
            <h2 style={{ fontFamily: "Road Rage", color: "white", fontSize: "50px" }} className="float-start mt-1 ms-4">Avenida Play
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="45" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </h2>
          </Link>
        </div>
        <div className="col">
          <ul className="navbar-nav d-flex justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" href="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/listar">Todos os álbuns</Link>
            </li>
            {
              clienteIsAdmin ?
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-dot align-self-center" viewBox="0 0 16 16">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                  </svg>
                  <li className="nav-item">
                    <Link className="nav-link" href="/cadastro">Cadastro</Link>
                  </li><li className="nav-item">
                    <Link className="nav-link" href="/estatisticas">Estatísticas</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/avaliacoes">Avaliações</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/clientes">Clientes</Link>
                  </li></>
                : null
            }
          </ul>
        </div>
        <div className="col">
          <h5 className="text-white text-end mx-3">
            {clienteNome ?
              <Dropdown>
                <Dropdown.Toggle className="bg-transparent btn" id="dropdown-basic" style={{ border: 'none', fontSize: '1.25rem', fontWeight: '500' }}>
                  {clienteNome}‎ ‎
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="mb-2" href="" onClick={logout}>Sair</Dropdown.Item>
                  <Dropdown.Item href="/passwordreset" >Alterar senha</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              :
              //<Link style={{ color: 'inherit', textDecoration: 'none' }} href="" onClick={logout}>{clienteNome}</Link>

              <Link style={{ color: 'inherit', textDecoration: 'none' }} href="/login">Login</Link>}
          </h5>
        </div>
      </div>`
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
      />`
    </nav >
  )
}