import React from "react";
import { inject, observer } from "mobx-react";
import Table from "react-table";
import "react-table/react-table.css";
import { GamesStore } from "../store/GamesStore";

// const data = [
//   { value: 14, picked: 4 },
//   { value: 32, picked: 2 },
//   { value: 38, picked: 3 }
// ];

function formatToTableData(value: number, picked: number) {
  return {
    value,
    picked
  };
}

interface StatisticsProps {
  gamesStore: GamesStore;
}

interface TableDataType {
  value: number;
  picked: number;
}

interface StatisticsState {
  data?: TableDataType[];
}

const Statistics: React.FunctionComponent<StatisticsProps> = ({
  gamesStore
}) => {
  const allValuesPicked = gamesStore.games
    .map(g => g.pickedValues)
    .reduce((agg, array) => [...agg, ...array], [])
    .reduce((agg: any, value) => {
      agg[value] = agg[value] ? agg[value] + 1 : 1;
      return agg;
    }, {});

  const data = Object.entries(allValuesPicked).map(([value, picked]) =>
    formatToTableData(
      Number.parseInt(value),
      Number.parseInt(picked.toString())
    )
  );

  console.log("render statistics");
  return (
    <>
      <h1>Statistiques</h1>
      <h2>Toutes parties confondues</h2>
      <Table
        data={data}
        className="-striped -highlight"
        columns={[
          { Header: "Numéro", accessor: "value" },
          { Header: "tirages", accessor: "picked" }
        ]}
        defaultPageSize={data.length}
        showPaginationBottom={false}
        defaultSorted={[
          {
            id: "value",
            asc: true
          },
          {
            id: "picked",
            asc: true
          }
        ]}
      />
    </>
  );
};

export default inject("gamesStore")(observer(Statistics));
