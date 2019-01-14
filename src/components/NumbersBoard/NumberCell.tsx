import * as React from "react";
import Button from "@material-ui/core/Button";
import PickedNumber from "../PickedNumber";

interface CellProps {
  value: number;
  on: boolean;
  toggleNumber: (value: number) => void;
}

export default class NumberCell extends React.Component<CellProps> {
  handleClick = () => {
    const { value, toggleNumber } = this.props;
    toggleNumber(value);
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        variant={"outlined"}
        fullWidth
        disableRipple
      >
        <PickedNumber {...this.props} />
      </Button>
    );
  }
}
