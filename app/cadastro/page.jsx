'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const [generos, setGeneros] = useState([]);
  const { register, handleSubmit, reset } = useForm({})
  useEffect(() => {
    async function fetchGeneros() {
      const dados = await getGeneros();
      setGeneros(dados);
    }
    fetchGeneros();
  }, []);;


  async function getGeneros() {
    const response = await fetch("http://localhost:3004/generos/", {
      cache: "no-store" // Desativa o cache (ou deveria MALDITO EDGE >:( ))
    });
    const dado = await response.json();
    return dado;
  }

  async function enviaDados(data) {
    const dadosComNotaZero = { ...data, soma: 1, num: 1, staffpicks: 0 };
    console.log(dadosComNotaZero)
    const album = await fetch("http://localhost:3004/albuns",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...dadosComNotaZero })
      },
    )
    if (album.status == 201) {
      toast.success("Ok! Album cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro... Não foi possível concluir o cadastro")
    }
  }


  return (
    <div className="container mt-4">
      <div style={{ maxWidth: "800px" }} className="card mx-auto">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Cadastrar um novo álbum</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit(enviaDados)}>
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

            <div className="col d-flex justify-content-end mt-4">
              <input type="submit" value="Enviar" className="btn btn-primary me-3" />
              <input type="button" value="Limpar" className="btn btn-danger" onClick={() => reset()} />
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
