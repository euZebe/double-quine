import React from "react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Chronometer from "./Chronometer";


describe("Chronometer", () => {
  it("should measure time elapsed between startTime and the moment the Stop button is clicked", () => {
    render(<Chronometer startTime={new Date()}/>);
  });

  it('should not count time during which chronometer was stopped', () => {

  });
});
