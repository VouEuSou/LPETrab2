'use client'
import Link from 'next/link'
import './login.css'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ClienteContext } from '@/contexts/cliente'
import { useRouter } from 'next/navigation'

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
      alert("E-mail ou senha inválidos!")
    } else {
      // alert("Ok!")
      mudaId(cliente[0].id)
      mudaNome(cliente[0].nome)
      mudaIsAdmin(cliente[0].isAdmin)

      localStorage.setItem("cliente_logado", JSON.stringify({ id: cliente[0].id, nome: cliente[0].nome, isAdmin: cliente[0].isAdmin }))
      router.push("/listar")
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(verificaLogin)}>
        <h1 className="h3 mb-3 fw-normal mt-5">Login do Cliente</h1>

        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            required {...register("email")} />
          <label for="floatingInput">E-mail</label>
        </div>
        <div className="form-floating mt-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
            required {...register("senha")} />
          <label for="floatingPassword">Senha de Acesso</label>
        </div>

        <div className="form-check text-end my-4">
          <Link href="/novocliente">
            Novo Cliente: Cadastre-se
          </Link>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
      </form>
    </main>
  )
}