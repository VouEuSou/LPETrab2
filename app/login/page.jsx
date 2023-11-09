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
  const { mudaId, mudaNome, mudaIsAdmin } = useContext(ClienteContext)

  const router = useRouter()

  async function verificaLogin(data) {
    //    console.log(data)
    const login = `email=${data.email}&senha=${data.senha}`
    const response = await fetch(`http://localhost:3004/clientes?${login}`)
    const cliente = await response.json()
    if (cliente.length == 0) {
      toast.error("Erro... Usuário ou senha incorretos")
    } else {
      mudaId(cliente[0].id)
      mudaNome(cliente[0].nome)
      mudaIsAdmin(cliente[0].isAdmin)

      localStorage.setItem("cliente_logado", JSON.stringify({ id: cliente[0].id, nome: cliente[0].nome, isAdmin: cliente[0].isAdmin }))
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
              <div className="form-check text-end my-4">
                <Link style={{ textDecoration: "none", color: "#212529" }} href="/novocliente">
                  Cadastrar-se
                </Link>
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