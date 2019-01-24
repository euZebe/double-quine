import * as React from "react";
import Button from "@material-ui/core/Button";
import PickedNumber from "../PickedNumber";

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
      <Button
        onClick={this.handleClick}
        variant="outlined"
        fullWidth
      >
        <PickedNumber {...this.props} />
      </Button>
    );
  }
}
