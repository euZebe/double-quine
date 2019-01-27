import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";

const NewGameCard: React.FunctionComponent<{ newIndex: number }> = ({
  newIndex
}) => (
  <Card
    description="Démarrer nouvelle partie"
    extra={
      <Link to={`/game/${newIndex}`}>
        <Button color="violet">Nouvelle partie</Button>
      </Link>
    }
  />
);

export default NewGameCard;
