import React from "react";
import { inject, observer } from "mobx-react";
import Table from "react-table";
import "react-table/react-table.css";
import { GamesStore } from "../store/GamesStore";

interface StatisticsProps {
  gamesStore: GamesStore;
}

@inject("gamesStore")
@observer
class Statistics extends React.Component<StatisticsProps> {
  render() {
    const { gamesStore } = this.props;
    const data = gamesStore.allPickedNumbers;
    return (
      <>
        <h1>Statistiques</h1>
        <h2>Toutes parties confondues</h2>
        {data.length ? (
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
        ) : <em>aucune partie trouvée</em>}
      </>
    );
  }
}

export default Statistics;
