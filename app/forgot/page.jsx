'use client'
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import "./forgot.css"
import { useRouter } from 'next/navigation'

let isHashSent = false;
let emailsaved = "";
export default function Forgot() {
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm({})

    async function registerUser(data) {
        emailsaved = data.email;
        console.log(data)
        const album = await fetch("http://localhost:3000/usuarios/recup",
            {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (album.status == 410) {
            isHashSent = true;
            toast.success("Código de verificação enviada ao e-mail cadastrado!")
            reset({
                email: emailsaved,
            })
        } else if (album.status == 200) {
            toast.success("Senha Alterada com Sucesso")
            router.push("/listar")
        } else {
            console.log(album.status)
            if (album.status == 401) {
                toast.error("Código de verificação incorreto")
            } else if (album.status == 400) {
                toast.error("Informe a nova senha")
            } else {
                toast.error(`${album.status.msg}`)
            }
        }
    }

    return (
        <main className="form-signin w-100 m-auto">
            <Card className='my-5'>
                <Card.Body>
                    <Card.Text>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <h2 style={{ fontFamily: "Road Rage", color: "black", fontSize: "70px" }} className="h3 mb-3 fw-normal my-2 mb-5 text-center">Recuperar sua senha</h2>
                            <div className="form-floating mt-3">
                                <input type="email" className="form-control" id="floatingMail" placeholder="name@example.com"
                                    required {...register("email")} />
                                <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingMail">E-mail</label>
                            </div>
                            {isHashSent ?
                                <span>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="token"
                                            required {...register("hash")} />
                                        <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingInput">Código de verificação</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                            required {...register("newpass")} />
                                        <label style={{ fontFamily: "Road Rage", fontSize: "20px", color: "gray" }} for="floatingPassword">Nova senha</label>
                                    </div>
                                </span>
                                : null}

                            <div className="form-check text-end my-4">
                                <Link style={{ textDecoration: "none", color: "#212529" }} href="/login">
                                    Lembrou? Faça login
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
