import React from "react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import NumberCell from "./NumberCell";

describe("NumberCell", () => {
  it("should call toggle function with value when being clicked", () => {
    const toggleMock = jest.fn();
    const r = render(
      <NumberCell value={4} on={true} toggleNumber={toggleMock} />
    );

    r.getByText("4").click();
    expect(toggleMock).toHaveBeenCalledTimes(1);
    expect(toggleMock).toBeCalledWith(4);
  });
});
