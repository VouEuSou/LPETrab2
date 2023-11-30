"use client";
// pages/Charts.js
import React, { useEffect, useState } from "react";
import AlbumChart from "@/components/AlbumChart";
import { Button, Card, Spinner, Tab, Tabs } from "react-bootstrap";
import AvalChart from "@/components/AvalChart";
import { set } from "react-hook-form";
async function getAlbums() {
  try {
    const response = await fetch("http://localhost:3000/album");
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro ao obter dados do banco:", error);
    throw error;
  }
}
async function getAval() {
  try {
    const response = await fetch("http://localhost:3000/avaliacoes");
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro ao obter dados do banco:", error);
    throw error;
  }
}

const Charts = () => {
  const [albums, setAlbums] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [genreChartData, setGenreChartData] = useState([]);
  const [yearChartData, setYearChartData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartToShow, setChartToShow] = useState("genre");
  const [mostActiveUser, setMostActiveUser] = useState(null);
  useEffect(() => {
    async function formatarDadosParaGrafico() {
      setIsLoading(true);
      const dadosDoBanco = await getAlbums();
      const dadosDoBancoAval = await getAval();
      setAvaliacoes(dadosDoBancoAval);
      setAlbums(dadosDoBanco);

      const genreCounts = {};
      const yearCounts = {};
      dadosDoBanco.forEach((album) => {
        const genre = album.genero;
        const year = album.data.split("-")[0]; // Extract the year from the date

        if (genreCounts.hasOwnProperty(genre)) {
          genreCounts[genre]++;
        } else {
          genreCounts[genre] = 1;
        }

        if (yearCounts.hasOwnProperty(year)) {
          yearCounts[year]++;
        } else {
          yearCounts[year] = 1;
        }
      });


      const avaliacaoCounts = {};
      dadosDoBancoAval.forEach((avaliacao) => {
        const albumId = avaliacao.album.id;
        if (avaliacaoCounts.hasOwnProperty(albumId)) {
          avaliacaoCounts[albumId]++;
        } else {
          avaliacaoCounts[albumId] = 1;
        }
      });

      const chartData = [["Álbum", "Quantidade de Avaliações"]];
      dadosDoBanco.forEach((album) => {
        const count = avaliacaoCounts[album.id] || 0;
        chartData.push([album.nome, count]);
      });

      dadosDoBancoAval.forEach((avaliacao) => {
        const avaliacaon = avaliacao.nota;
        if (avaliacaoCounts.hasOwnProperty(avaliacaon)) {
          avaliacaoCounts[avaliacaon]++;
        } else {
          avaliacaoCounts[avaliacaon] = 1;
        }
      });

      const emailCounts = {};
      dadosDoBancoAval.forEach((avaliacao) => {
        if (emailCounts[avaliacao.email]) {
          emailCounts[avaliacao.email]++;
        } else {
          emailCounts[avaliacao.email] = 1;
        }
      });

      let maxEmail = null;
      let maxCount = 0;
      for (let email in emailCounts) {
        if (emailCounts[email] > maxCount) {
          maxEmail = email;
          maxCount = emailCounts[email];
        }
      }


      // Convert genre counts into an array format for the chart
      const genreChartData = [["Gênero", "Número de Álbuns"]];
      for (const genre in genreCounts) {
        genreChartData.push([genre, genreCounts[genre]]);
      }

      // Convert year counts into an array format for the chart
      const yearChartData = [["Ano", "Número de Álbuns"]];
      for (const year in yearCounts) {
        yearChartData.push([year, yearCounts[year]]);
      }

      setMostActiveUser(maxEmail);
      setAlbums(dadosDoBanco);
      setGenreChartData(genreChartData);
      setYearChartData(yearChartData);
      setChartData(chartData);
      setIsLoading(false);
    }


    formatarDadosParaGrafico();

  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Estatísticas dos álbuns</h2>
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Estatísticas dos álbuns</h2>
      <div className="container text-center mb-4">
        <div className="row">
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Total de Álbuns
                </Card.Title>
                <Card.Text>{albums.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Nº de gêneros
                </Card.Title>
                <Card.Text>
                  {
                    albums.reduce((total, album) => {
                      if (!total.includes(album.genero)) {
                        total.push(album.genero);
                      }
                      return total;
                    }, []).length
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Valor total
                </Card.Title>
                <Card.Text>
                  R${" "}
                  {albums
                    .reduce((total, album) => total + +album.preco, 0)
                    .toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Preço Médio
                </Card.Title>
                <Card.Text>
                  R${" "}
                  {(
                    albums.reduce((total, album) => total + +album.preco, 0) /
                    (albums.length - 1)
                  ).toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Album mais caro
                </Card.Title>
                <Card.Text>
                  {
                    albums.reduce((max, album) =>
                      +album.preco > +max.preco ? album : max
                    ).titulo
                  }{" "}
                  R${" "}
                  {
                    albums.reduce((max, album) =>
                      +album.preco > +max.preco ? album : max
                    ).preco
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="container text-center mb-4 row">
        <div className="col">
          <Button
            variant={chartToShow === "genre" ? "primary" : "secondary"}
            onClick={() => setChartToShow("genre")}
          >
            Albums por Gênero
          </Button>
        </div>
        <div className="col">
          <Button
            variant={chartToShow === "year" ? "primary" : "secondary"}
            onClick={() => setChartToShow("year")}
          >
            Albums por Ano
          </Button>
        </div>
      </div>
      <div
        className="container text-center my-4"
        style={{ display: chartToShow === "genre" ? "flex" : "none" }}
      >
        <AlbumChart data={genreChartData} />
      </div>

      <div
        className="container text-center my-4"
        style={{ display: chartToShow === "year" ? "flex" : "none" }}
      >
        <AlbumChart data={yearChartData} />
      </div>
      <h2 className="text-center mb-4">Estatísticas de clientes</h2>
      <div className="container text-center mb-4">
        <div className="row">
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Total de Avaliações
                </Card.Title>
                <Card.Text>{avaliacoes.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Cliente mais ativo
                </Card.Title>
                <Card.Text>{mostActiveUser}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <AvalChart data={chartData} />

    </div>
  );
};

export default Charts;
