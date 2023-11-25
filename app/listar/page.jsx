'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import { Spinner } from "react-bootstrap"

export default function Listagem() {
  const [albuns, setAlbuns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [opcaoOrdenacao, setOpcaoOrdenacao] = useState('');

  useEffect(() => {
    async function getAlbuns() {
      const response = await fetch("http://localhost:3000/album")
      const dados = await response.json()
      setAlbuns(dados)
      setIsLoading(false)
    }
    getAlbuns()
  }, [])

  const listaAlbuns = albuns.map(album => (
    <ItemLista key={album.id}
      album={album}
      altera={() => router.push('altera/' + album.id)}
      consulta={() => router.push('consulta/' + album.id)}
    />
  ))

  function BuscaAlbuns(data) {
    const pesquisa = data.pesq.toUpperCase()
    async function getAlbuns() {
      const response = await fetch("http://localhost:3000/album")
      const dados = await response.json()

      const novosDados = dados.filter(album =>
        album.nome.toUpperCase().includes(pesquisa) || album.genero.toUpperCase().includes(pesquisa) || album.artista.toUpperCase().includes(pesquisa)
      )
      setAlbuns(novosDados)
    }
    getAlbuns()
  }

  function ordenarPorPreco() {
    const albunsOrdenados = [...albuns].sort((a, b) => b.preco - a.preco);
    setAlbuns(albunsOrdenados);
  }

  function ordenarPorNome() {
    const albunsOrdenados = [...albuns].sort((a, b) => a.nome.localeCompare(b.nome));
    setAlbuns(albunsOrdenados);
  }

  function ordenarPorGenero() {
    const albunsOrdenados = [...albuns].sort((a, b) => a.genero.localeCompare(b.genero));
    setAlbuns(albunsOrdenados);
  }

  function ordenarPorNota() {
    const albunsOrdenados = [...albuns].sort((a, b) => (b.soma / b.num) - (a.soma / a.num));
    setAlbuns(albunsOrdenados);
  }

  function ordenarAlbuns() {
    switch (opcaoOrdenacao) {
      case 'preco':
        ordenarPorPreco();
        break;
      case 'nome':
        ordenarPorNome();
        break;
      case 'genero':
        ordenarPorGenero();
        break;
      case 'nota':
        ordenarPorNota();
        break;
      default:
        mostraTodos()
        //volta ao original (>> ordem de colocação na database <<)
        break;
    }
  }

  useEffect(() => {
    ordenarAlbuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opcaoOrdenacao]);

  function mostraTodos() {
    async function getAlbuns() {
      const response = await fetch("http://localhost:3000/album")
      const dados = await response.json()
      setAlbuns(dados)
      setIsLoading(false)
    }
    getAlbuns()
  }

  if (isLoading) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-4">
          <Spinner animation="border" role="status">
          </Spinner>
        </h1>
        <h3>Carregando biblioteca de álbuns!</h3>
      </div>
    )
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex justify-content-center mt-2">
          <div className="row align-items-center mx-3 ">
            <select className="form-select " value={opcaoOrdenacao} onChange={(e) => setOpcaoOrdenacao(e.target.value)}>
              <option value="">Selecione uma ordem</option>
              <option value="preco">Preço</option>
              <option value="nome">Nome</option>
              <option value="genero">Gênero</option>
              <option value="nota">Nota</option>
            </select>
          </div>
          <Pesquisa filtra={BuscaAlbuns} mostra={mostraTodos} />
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          {listaAlbuns}
        </div>
      </div>
    </div>
  )

}