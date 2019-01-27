import * as React from "react";
import { GameType } from "./DayContext";
import PickedNumber from "./PickedNumber";
import { CSSProperties } from "../../node_modules/@types/react-dom/node_modules/@types/react";

interface PickedNumbersListProps {
  game: GameType;
}

const styles: any = {
  container: {
    gridArea: "list"
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "41px"
  }
};

const PickedNumbersList: React.FunctionComponent<PickedNumbersListProps> = ({
  game
}) => (
  <div style={styles.container}>
    <h2> Total tirages: {game.pickedValues.length}</h2>
    <div style={styles.list}>
      {game &&
        game.pickedValues.map(value => (
          <PickedNumber value={value} key={value} on />
        ))}
    </div>
  </div>
);

export default PickedNumbersList;
