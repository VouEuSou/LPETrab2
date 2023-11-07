'use client'
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
  const params = useParams()
  const [generos, setGeneros] = useState([]);
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    async function fetchGeneros() {
      const dados = await getGeneros();
      setGeneros(dados);
    }
    fetchGeneros();
  }, []);;


  useEffect(() => {
    async function getAlbum() {
      const response = await fetch("http://localhost:3004/albuns/" + params.id)
      const dado = await response.json()
      reset({
        titulo: dado.titulo,
        genero: dado.genero,
        preco: dado.preco,
        duracao: dado.duracao,
        data: dado.data,
        classif: dado.classif,
        artista: dado.artista,
        capa: dado.capa,
        sinopse: dado.sinopse
      })
    }
    getAlbum()
  }, [])

  async function getGeneros() {
    const response = await fetch("http://localhost:3004/generos/", {
      cache: "no-store" // Desativa o cache (ou deveria MALDITO EDGE >:( ))
    });
    const dado = await response.json();
    return dado;
  }

  async function alteraDados(data) {
    const response = await fetch("http://localhost:3004/albuns/" + params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (response.status == 200) {
      toast.success("Album foi atualizado com sucesso!")
    } else {
      toast.error("Oops... Algo de errado não está certo")
    }
  }

  async function excluiAlbum(id) {
    const response = await fetch("http://localhost:3004/albuns/" + id, {
      method: "DELETE"
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
                <label htmlFor="titulo" className="form-label">Nome do álbum</label>
                <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
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
                <select className="form-select" {...register("genero")}>
                  {generos.map(item => (
                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-8">
                <label htmlFor="capa" className="form-label">Imagem da capa</label>
                <input type="url" className="form-control" id="capa" {...register("capa")} required />
              </div>
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