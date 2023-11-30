import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const AlbumAvalChart = ({ data }) => {
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Bar"
        loader={<div>Carregando Gráfico</div>}
        data={data}
        options={{
          title: "Quantidade de Avaliações por Álbum",
          hAxis: {
            title: "Álbum",
          },
          vAxis: {
            title: "Quantidade de Avaliações",
            minValue: 0,
          },
        }}
      />
    </div>
  );
};

export default AlbumAvalChart;
