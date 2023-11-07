/* eslint-disable @next/next/no-img-element */
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import EditarInfo from "@/components/EditarInfo"

async function getAlbum(id) {
  const response = await fetch("http://localhost:3004/albuns/"+id, {
    cache: "no-store" // Desativa o cache (ou deveria MALDITO EDGE >:( ))
  });
  const dado = await response.json();
  return dado;
}


  export default async function Consulta({params}) {

    const album = await getAlbum(params.id)
    
  
  return (
    <div className="container mt-4">
    <div style={{ maxWidth: "800px" }} className="card mx-auto">
      <div className="card-body">
      <Link className="bi float-start" style={{fontSize: 28, color: "black"}} href={`/listar`}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></Link>
        <h2 className="card-title text-center mb-4">Detalhes do álbum</h2>
        <form encType="multipart/form-data">
          <div className="row">
            <div className="col-sm-4">
              <label htmlFor="titulo" className="form-label">Nome do álbum</label>
              <input type="text" className="form-control"  readOnly defaultValue={album.titulo}  />
            </div>
            <div className="col-sm-3">
              <label htmlFor="artista" className="form-label">Artista</label>
              <input type="text" className="form-control" id="artista" readOnly defaultValue={album.artista} />
            </div>
            <div className="col-sm-2">
              <label htmlFor="preco" className="form-label">Preço R$</label>
              <input type="number" step="0.10" className="form-control" id="preco" defaultValue={album.preco} readOnly />
            </div>
            <div className="col-sm-3">
              <label htmlFor="data" className="form-label">Lançamento:</label>
              <input type="month" className="form-control" id="data" defaultValue={album.data} readOnly />
            </div>
          </div>

          <div className="row mt-3">

            <div className="col-sm-4">
              <label htmlFor="genero" className="form-label">Gênero</label>
              <input type="text" className="form-control" id="artista" readOnly defaultValue={album.genero} />
            </div>
            <div className="col-sm-2">
              <label htmlFor="nota" className="form-label">Sua nota</label>
              <select className="form-select" id="nota" defaultValue={album.nota}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>

              </select>
            </div>
            <div className="col-sm-6">
            <p className="form-label">Capa do álbum</p>
            <img src={album.capa} id="capa" alt={`Capa do álbum ${album.capa}`} width={200} height={200} className=" d-block mb-4 mx-auto" />
          </div>
          </div>


          
          <EditarInfo album={album}/>
        
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