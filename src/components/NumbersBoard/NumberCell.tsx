import * as React from "react";
import { Button } from "semantic-ui-react";
import PickedNumber from "../PickedNumber";

const containerStyle = { display: "flex", justifyContent: "center" };

export interface CellProps {
  value: number;
  on: boolean;
  toggleNumber: (value: number) => void;
}

export default class NumberCell extends React.PureComponent<CellProps> {
  handleClick = () => {
    const { value, toggleNumber } = this.props;
    toggleNumber(value);
  };

  render() {
    return (
      <Button onClick={this.handleClick} basic fluid className="numberCell">
        <div style={containerStyle}>
          <PickedNumber {...this.props} />
        </div>
      </Button>
    );
  }
}
