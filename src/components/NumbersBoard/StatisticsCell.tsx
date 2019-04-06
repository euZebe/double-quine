import * as React from "react";
import { Button } from "semantic-ui-react";
import PickedNumber from "../PickedNumber";
import styled from "styled-components";
import { CellProps } from "./CellPropsType";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Count = styled.span`
  position: relative;
  top: 2rem;
  left: 1rem;
  font-size: 1.5rem;
  width: 0;
`;

export default class StatisticsCell extends React.PureComponent<CellProps> {
  handleClick = () => {
    const { value, toggleNumber } = this.props;
    toggleNumber(value);
  };

  render() {
    const { timesPicked } = this.props;
    return (
      <Button onClick={this.handleClick} basic fluid className="numberCell">
        <Container>
          <PickedNumber {...this.props} />
          <Count>{timesPicked}</Count>
        </Container>
      </Button>
    );
  }
}
