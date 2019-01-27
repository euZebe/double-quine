import * as React from "react";
import _isEqual from 'lodash/isEqual';
import NumberCell, { CellProps } from "./NumberCell";
import { ReactElement } from "react";

interface NumbersBoardProps {
  pickedValues: number[];
  rows?: number;
  onValuePicked: (value: number) => void;
}

const RowStyle = {
  display: "flex",
  justifyContent: "space-between"
};

class Row extends React.Component<{children: ReactElement<CellProps>[]}> {
  getOnProp = (c: any) => c.props.on;
  shouldComponentUpdate(nextProps: any) {
    return !_isEqual(nextProps.children.map(this.getOnProp), this.props.children.map(this.getOnProp));
  }

  render() {
    const { children } = this.props;
    return <div style={RowStyle}>{children}</div>;
  }
}

const containerStyle = {
  gridArea: "board"
}

class NumbersBoard extends React.PureComponent<NumbersBoardProps> {

  render() {
    const { pickedValues, onValuePicked } = this.props;
    const { rows = 9 } = this.props;
    return (
      <div style={containerStyle}>
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
                      <NumberCell
                        key={cellIndex}
                        value={value}
                        on={pickedValues.includes(value)}
                        toggleNumber={onValuePicked}
                      />
                    );
                  })}
              </Row>
            );
          })}
      </div>
    );
  }
}

export default NumbersBoard;
