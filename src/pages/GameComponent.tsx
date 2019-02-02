import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import PickedNumbersList from "../components/PickedNumbersList";
import NumbersBoard from "../components/NumbersBoard/NumbersBoard";
import { GameType } from "../components/DayContext";
import Chronometer from "../components/Chronometer";
import styled from "styled-components";

interface Props {
  game: GameType;
  handleValuePicked: (value: number) => void;
  setDuration: (value: number) => void;
  isStarted: boolean;
}

const Container = styled.div`
  display: grid;
  height: calc(100vh - 28px);
  grid-template-areas: "board board" "list chrono" "list button";
  grid-template-columns: 82vw 1fr;
`;

const StyledLink = styled(Link)`
  grid-area: button;
  align-self: end;
  justify-self: end;
`;

const GameComponent: React.FunctionComponent<Props> = ({
  game,
  isStarted,
  setDuration,
  handleValuePicked
}) => (
  <Container>
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
    <StyledLink to="/">
      <Button color="violet">Fin de partie</Button>
    </StyledLink>
  </Container>
);

export default observer(GameComponent);
