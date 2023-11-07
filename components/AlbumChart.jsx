// components/AlbumChart.js
import React from "react";
import { Chart } from "react-google-charts";

const AlbumChart = ({ data }) => {

  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="Bar"
      loader={<div>Carregando gráficos</div>}
      data={data}
      options={{
        title: "Preços dos Álbuns",
        hAxis: {
          title: "Álbum",
        },
        vAxis: {
          title: "Preço (R$)",
          minValue: 0,
        },
      }}
    />
  );
};

export default AlbumChart;
