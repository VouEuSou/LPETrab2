'use client'
import Link from 'next/link'
import './login.css'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ClienteContext } from '@/contexts/cliente'
import { useRouter } from 'next/navigation'
import { Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
  const { register, handleSubmit } = useForm()
  const { mudaId, mudaNome, mudaIsAdmin, mudaToken, mudaEmail } = useContext(ClienteContext)

  const router = useRouter()

  async function verificaLogin(data) {
    //    console.log(data)
    const login = `
    {
      "email": "${data.email}",
      "senha": "${data.senha}"
    }   
    `
    console.log(login)
    const response = await fetch(`http://localhost:3000/login`,
      {
        method: "POST",
        body: login,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    console.log(response)
    const cliente = await response.json()
    if (cliente == "⚠️ Login ou senha inválido") {
      toast.error("Erro... Usuário ou senha incorretos")
    } else {
      console.log(cliente)
      mudaId(cliente.usuario_id)
      mudaNome(cliente.usuario_nome)
      mudaIsAdmin(cliente.usuario_isAdm)
      mudaToken(cliente.token)
      mudaEmail(cliente.usuario_email)

      localStorage.setItem("cliente_logado", JSON.stringify({ id: cliente.usuario_id, nome: cliente.usuario_nome, email: cliente.usuario_email, isAdmin: cliente.usuario_isAdm, token: cliente.token }))
      router.push("/listar")
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <Card className='my-5'>
        <Card.Body>
          <Card.Text>
            <form onSubmit={handleSubmit(verificaLogin)}>
              <h2 style={{ fontFamily: "Road Rage", color: "black", fontSize: "70px" }} className="h3 mb-3 fw-normal my-2 mb-5 text-center">Login do Cliente</h2>

              <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                  required {...register("email")} />
                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingInput">E-mail</label>
              </div>
              <div className="form-floating mt-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                  required {...register("senha")} />
                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingPassword">Senha</label>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div className="text-start">
                  <Link style={{ textDecoration: "none", color: "#212529" }} href="/forgot">
                    Esqueceu sua senha?
                  </Link>
                </div>
                <div className="text-end">
                  <Link style={{ textDecoration: "none", color: "#212529" }} href="/cadastroUser">
                    Cadastrar-se
                  </Link>
                </div>
              </div>
              <button className="btn btn-dark w-100 py-2 mb-3" type="submit">Entrar</button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
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
      />
    </main>
  )
}