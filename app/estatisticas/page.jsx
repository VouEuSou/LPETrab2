"use client";
// pages/Charts.js
import React, { useEffect, useState } from "react";
import AlbumChart from "@/components/AlbumChart";
import { Button, Card, Spinner, Tab, Tabs } from "react-bootstrap";

async function getAlbums() {
  try {
    const response = await fetch("http://localhost:3004/albuns");
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro ao obter dados do banco:", error);
    throw error;
  }
}

const Charts = () => {
  const [albums, setAlbums] = useState([]);
  const [genreChartData, setGenreChartData] = useState([]);
  const [yearChartData, setYearChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartToShow, setChartToShow] = useState("genre");

  useEffect(() => {
    async function formatarDadosParaGrafico() {
      setIsLoading(true);
      const dadosDoBanco = await getAlbums();

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

      setAlbums(dadosDoBanco);
      setGenreChartData(genreChartData);
      setYearChartData(yearChartData);
      setIsLoading(false);
    }

    formatarDadosParaGrafico();
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Gráfico de Preços</h2>
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gráfico de Preços</h2>
      <div className="container text-center mb-4">
        <div className="row">
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>
                  Total de Álbuns
                </Card.Title>
                <Card.Text>{albums.length - 1}</Card.Text>
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
                  - R${" "}
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
    </div>
  );
};

export default Charts;
