'use client'
import './app.css'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
export default function Home() {
  const [albuns, setAlbuns] = useState([])
  const router = useRouter()


  useEffect(() => {
    async function getAlbuns() {
      const response = await fetch("http://localhost:3000/album/picks")
      const dados = await response.json()
      const albunsOrdenados = [...dados].sort((a, b) => (b.soma / b.num) - (a.soma / a.num));
      setAlbuns(albunsOrdenados);
    }
    getAlbuns()
  }, [])

  const listaAlbuns = albuns.slice(0, 6).map(album => (
    <ItemLista key={album.id}
      album={album}
    />
  ))



  return (
    <div>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col d-flex align-items-center justify-content-center overflow-hidden imagem-overlay" style={{ height: '300px' }}>
            <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src="../main.png" className="img-cover" alt="Imagem Grande" />
            <div className="texto-overlay">
              Seu disco está aqui!
            </div>
          </div>
        </div>
      </div>
      <div className="row text-center">
        <h1 className="h3 fw-normal mt-4"><b>Escolhas da Equipe</b></h1>
      </div>
      <div className="container-fluid mt-4 ">
        <div className="row justify-content-center">
          {listaAlbuns}
        </div>
      </div>
    </div>
  )


}
