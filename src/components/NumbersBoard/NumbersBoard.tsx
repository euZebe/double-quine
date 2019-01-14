import * as React from "react";
import NumberCell from "./NumberCell";

interface NumbersBoardProps {
  pickedValues: number[];
  rows?: number;
  handleValuePicked?: (value: number) => void;
}

interface NumbersBoardState {
  pickedValues: number[];
}

const RowStyle = {
  display: "flex",
  justifyContent: "space-between"
};
const Row: React.FunctionComponent = ({ children }) => (
  <div style={RowStyle}>{children}</div>
);

class NumbersBoard extends React.PureComponent<NumbersBoardProps> {
  state: NumbersBoardState = { pickedValues: this.props.pickedValues };

  handleToggle = (value: number) => {
    const { pickedValues } = this.state;
    const indexOfValue = pickedValues.indexOf(value);
    if (pickedValues.length && indexOfValue === pickedValues.length - 1) {
      // remove last
      this.setState({
        pickedValues: pickedValues.slice(0, pickedValues.length - 1)
      });
    } else if (indexOfValue === -1) {
      // if value exists in the array but not at the last place, don't add it
      this.setState({
        pickedValues: [...pickedValues, value]
      });
    }
  };

  render() {
    const { rows = 9 } = this.props;
    const { pickedValues } = this.state;
    return (
      <div>
        {Array(rows)
          .fill(null)
          .map((_, rowIndex) => (
            <Row key={rowIndex}>
              {Array(10)
                .fill(null)
                .map((_, cellIndex) => {
                  const value = rowIndex * 10 + cellIndex + 1;
                  return (
                    <NumberCell
                      key={cellIndex}
                      value={value}
                      on={pickedValues.includes(value)}
                      toggleNumber={this.handleToggle}
                    />
                  );
                })}
            </Row>
          ))}
      </div>
    );
  }
}

export default NumbersBoard;
