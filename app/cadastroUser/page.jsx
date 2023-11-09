'use client'
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import "./cadastro.css"


export default function Cadastro() {
    const { register, handleSubmit, reset } = useForm({})

    async function registerUser(data) {
        const album = await fetch("http://localhost:3004/clientes",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data, isAdmin: false })
            },
        )
        if (album.status == 201) {
            toast.success("Cadastro realizado com sucesso")
            reset()
        } else {
            toast.error("Erro... Não foi possível concluir o cadastro")
        }
    }

    return (
        <main className="form-signin w-100 m-auto">
            <Card className='my-5'>
                <Card.Body>
                    <Card.Text>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <h2 style={{ fontFamily: "Road Rage", color: "black", fontSize: "70px" }} className="h3 mb-3 fw-normal my-2 mb-5 text-center">Cadastrar cliente</h2>

                            <div className="form-floating">
                                <input type="nome" className="form-control" id="floatingNome" placeholder="Nome"
                                    required {...register("nome")} />
                                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingNome">Nome</label>
                            </div>
                            <div className="form-floating mt-3">
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
                                <Link style={{ textDecoration: "none", color: "#212529" }} href="/login">
                                    Já cadastrado? Faça login
                                </Link>
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
