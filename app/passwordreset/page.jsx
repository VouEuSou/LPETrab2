'use client'
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import "./reset.css"


const usuario = JSON.parse(localStorage.getItem("cliente_logado"))
export default function Cadastro() {
    const { register, handleSubmit, reset } = useForm({})

    async function registerUser(data) {
        const album = await fetch("http://localhost:3000/usuarios",
            {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (album.status == 200) {
            toast.success("Senha atualizada com sucesso!")
            reset()
        } else {
            toast.error("Erro ao atualizar senha")
        }
    }

    return (
        <main className="form-signin w-100 m-auto">
            <Card className='my-5'>
                <Card.Body>
                    <Card.Text>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <h2 style={{ fontFamily: "Road Rage", color: "black", fontSize: "70px" }} className="h3 mb-3 fw-normal my-2 mb-5 text-center">Alterar sua senha</h2>

                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingInput" placeholder="email" defaultValue={usuario.email} readOnly
                                    required {...register("email")} />
                                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingNome">E-mail</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                    required {...register("senha")} />
                                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingPassword">Senha</label>
                            </div>
                            <div className="form-floating mt-3 mb-5">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                    required {...register("novaSenha")} />
                                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingPassword">Nova Senha</label>
                            </div>
                            <button className="btn btn-dark w-100 py-2 mb-3" type="submit">Cadastrar</button>
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
