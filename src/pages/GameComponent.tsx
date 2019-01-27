import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import PickedNumbersList from "../components/PickedNumbersList";
import NumbersBoard from "../components/NumbersBoard/NumbersBoard";
import { GameType } from "../components/DayContext";
import Chronometer from "../components/Chronometer";

interface Props {
  game: GameType;
  handleValuePicked: (value: number) => void;
  setDuration: (value: number) => void;
  isStarted: boolean;
}

const containerStyle = {
  display: "grid",
  height: "calc(100vh - 28px)",
  gridTemplateAreas: "'board board' 'list chrono' 'list button'",
  gridTemplateColumns: "82vw 1fr"
};

const buttonStyle = {
  gridArea: "button",
  alignSelf: "end",
  justifySelf: "end"
};

const GameComponent: React.FunctionComponent<Props> = ({
  game,
  isStarted,
  setDuration,
  handleValuePicked
}) => (
  <div style={containerStyle}>
    <NumbersBoard
      pickedValues={game.pickedValues}
      onValuePicked={handleValuePicked}
    />
    <PickedNumbersList game={game} />

    <Chronometer
      startNow={isStarted}
      onStop={setDuration}
      timeFromPastSession={game.duration}
    />
    <Link to="/" style={buttonStyle}>
      <Button color="violet">Fin de partie</Button>
    </Link>
  </div>
);

export default observer(GameComponent);
