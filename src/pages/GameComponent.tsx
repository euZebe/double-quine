import * as React from "react";
import { Link } from "react-router-dom";
import PickedNumbersList from "../components/PickedNumbersList";
import NumbersBoard from "../components/NumbersBoard/NumbersBoard";
import { GameType } from "../components/DayContext";
import Button from "@material-ui/core/Button";

interface Props {
  game: GameType;
  handleValuePicked: (value: number) => void;
}

const GameComponent: React.FunctionComponent<Props> = ({ game, handleValuePicked }) => (
  <>
    <NumbersBoard pickedValues={game.pickedValues} onValuePicked={handleValuePicked} />
    <PickedNumbersList game={game} />

    <Link to="/">
      <Button variant="contained">Fin de partie</Button>
    </Link>
  </>
);

export default GameComponent;
