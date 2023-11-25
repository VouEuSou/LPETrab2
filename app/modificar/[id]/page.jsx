'use client'
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import './modificar.css'

export default function Alteracao() {
  const params = useParams()
  const { register, handleSubmit, reset } = useForm()
  const usuario = JSON.parse(localStorage.getItem("cliente_logado"))


  useEffect(() => {
    async function getAlbum() {
      const response = await fetch("http://localhost:3000/album/" + params.id)
      const dado = await response.json()
      reset({
        nome: dado.nome,
        genero: dado.genero,
        preco: dado.preco,
        data: dado.data,
        artista: dado.artista,
        capa: dado.capa,
        staffpicks: dado.staffpicks
      })
    }
    getAlbum()
  }, [params.id, reset])


  async function alteraDados(data) {
    console.log(data)
    const response = await fetch("http://localhost:3000/album/edit/" + params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json", "Authorization": `${usuario.token}` },
        body: JSON.stringify({ ...data, usuario_id: `${usuario.id}` })
      },
    )
    if (response.status == 200) {
      toast.success("Album foi atualizado com sucesso!")
    } else {
      toast.error("Oops... Algo de errado não está certo")
    }
  }

  async function excluiAlbum(id) {
    const response = await fetch("http://localhost:3000/album/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json", "Authorization": `${usuario.token}` }
    })
    if (response.status == 200) {
      toast.warn("O álbum escolhido foi removido!")
    } else {
      toast.error("Oops... Algo de errado não está certo")
    }
  }


  return (
    <div className="container mt-4">
      <div style={{ maxWidth: "800px" }} className="card mx-auto">
        <div className="card-body">
          <Link className="bi float-start" style={{ fontSize: 28, color: "black" }} href={`/visualizar/${params.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg></Link>
          <h2 className="card-title text-center mb-4">Editar detalhes do álbum</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit(alteraDados)}>
            <div className="row">
              <div className="col-sm-4">
                <label htmlFor="nome" className="form-label">Nome do álbum</label>
                <input type="text" className="form-control" id="nome" {...register("nome")} required />
              </div>
              <div className="col-sm-3">
                <label htmlFor="artista" className="form-label">Artista</label>
                <input type="text" className="form-control" id="artista" {...register("artista")} required />
              </div>
              <div className="col-sm-2">
                <label htmlFor="preco" className="form-label">Preço R$</label>
                <input type="number" step="0.10" className="form-control" id="preco" {...register("preco")} required />
              </div>
              <div className="col-sm-3">
                <label htmlFor="data" className="form-label">Lançamento:</label>
                <input type="month" className="form-control" id="data" {...register("data")} required />
              </div>
            </div>

            <div className="row mt-3">

              <div className="col-sm-4">
                <label htmlFor="genero" className="form-label">Gênero</label>
                <select className="form-select" id="genero" {...register("genero")} required>
                  <option value="Undefined">Selecione um gênero</option>
                  <option value="Rock">Rock</option>
                  <option value="Pop">Pop</option>
                  <option value="Indie">Indie</option>
                  <option value="Metal">Metal</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Blues">Blues</option>
                  <option value="Rap">Rap</option>
                  <option value="Funk">Funk</option>
                  <option value="Sertanejo">Sertanejo</option>
                  <option value="Samba">Samba</option>
                  <option value="Pagode">Pagode</option>
                  <option value="MPB">MPB</option>
                  <option value="Eletrônica">Eletrônica</option>
                  <option value="Country">Country</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Clássica">Clássica</option>
                  <option value="Folk">Folk</option>
                </select>
              </div>

              <div className="col-sm-8">
                <label htmlFor="capa" className="form-label">Imagem da capa</label>
                <input type="url" className="form-control" id="capa" {...register("capa")} required />
              </div>
            </div>
            <div class=" mx-2 mt-3 form-check d-flex justify-content-end form-switch">
              <label htmlFor="staffpicks" style={{ marginRight: '50px' }} class="form-check-label" for="flexSwitchCheckDefault">Aparecer na Landing</label>
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" {...register("staffpicks")} />
            </div>


            <div className="col-sm-3 mt-4">
              <input type="button" value="Excluir álbum" className="btn btn-danger float-start" onClick={() => excluiAlbum(params.id)} />
            </div>
            <div className="col d-flex mt-4 justify-content-end">
              <input type="submit" value="Enviar" className="btn btn-success me-3 justify-content-end" />
              <input type="button" value="Voltar ao padrão" className="btn btn-warning" onClick={() => reset()} />
            </div>
          </form>
        </div>
      </div>
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
    </div>
  )
}