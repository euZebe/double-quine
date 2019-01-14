import * as React from "react";
import { Game } from "./DayContext";

interface PickedNumberProps {
  value: number;
  on: boolean;
}

const stylePicked = {
  width: "2rem",
  height: "2rem",
  border: "5px solid #33e8",
  borderRadius: "2rem",
  margin: "3px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "large",
  // fontWeight: "bold",
  color: "#55f",
  fontFamily: "monospace"
};
const styledAvailable = {
  ...stylePicked,
  border: "5px solid lightgrey",
  color: "grey"
};

const PickedNumber: React.FunctionComponent<PickedNumberProps> = ({
  value,
  on
}) => {
  return (
    <div
      data-testid={on ? "picked" : "available"}
      style={on ? stylePicked : styledAvailable}
    >
      {value}
    </div>
  );
};

export default PickedNumber;
