import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const StatisticsMenu: React.FunctionComponent = () => (
  <>
    <h1>Statistiques</h1>

    <Button.Group>
      <Button>
        <Link to="/stats/board">Carton</Link>
      </Button>
      <Button>
        <Link to="/stats/table">Tableau</Link>
      </Button>
    </Button.Group>
  </>
);

export default StatisticsMenu;
