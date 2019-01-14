import * as React from "react";
import { Game } from "./DayContext";
import PickedNumber from "./PickedNumber";

interface PickedNumbersListProps {
  game: Game;
}

const PickedNumbersList: React.FunctionComponent<PickedNumbersListProps> = ({
  game
}) => (
  <>
    <div style={{ display: "flex" }}>
      {game &&
        game.pickedValues.map(value => (
          <PickedNumber value={value} key={value} on />
        ))}
    </div>
    <div> Total tirages: {game.pickedValues.length}</div>
  </>
);

export default PickedNumbersList;
