import * as React from "react";
import _isEqual from "lodash/isEqual";
import { CellProps } from "./NumberCell";
import { ReactElement } from "react";
import styled from "styled-components";
import StatisticsCell from "./StatisticsCell";
import { inject, observer } from "mobx-react";
import { GamesStore } from "../../store/GamesStore";

interface NumbersBoardProps {
  pickedValues: number[];
  rows?: number;
  onValuePicked: (value: number) => void;
  gamesStore?: GamesStore;
}

const BaseRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Row extends React.Component<{ children: ReactElement<CellProps>[] }> {
  getOnProp = (c: any) => c.props.on;
  shouldComponentUpdate(nextProps: any) {
    return !_isEqual(
      nextProps.children.map(this.getOnProp),
      this.props.children.map(this.getOnProp)
    );
  }

  render() {
    const { children } = this.props;
    return <BaseRow>{children}</BaseRow>;
  }
}

const Container = styled.div`
  grid-area: board;
`;

@inject("gamesStore")
@observer
class NumbersBoard extends React.Component<NumbersBoardProps> {
  static defaultProps = {
    gamesStore: null
  };

  render() {
    const { pickedValues, onValuePicked, gamesStore } = this.props;
    const { rows = 9 } = this.props;
    return (
      <Container>
        {Array(rows)
          .fill(null)
          .map((_: number, rowIndex: number) => {
            return (
              <Row key={rowIndex}>
                {Array(10)
                  .fill(null)
                  .map((_: number, cellIndex: number) => {
                    const value = rowIndex * 10 + cellIndex + 1;
                    return (
                      <StatisticsCell
                        key={cellIndex}
                        value={value}
                        on={pickedValues.includes(value)}
                        toggleNumber={onValuePicked}
                        timesPicked={gamesStore ? gamesStore.allPickedNumbers[value] : 0}
                      />
                    );
                  })}
              </Row>
            );
          })}
      </Container>
    );
  }
}

export default NumbersBoard;
