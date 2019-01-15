import React from "react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import { axe } from "jest-axe";
import NumbersBoard from "./NumbersBoard";

describe("NumbersBoard", () => {
  it("should mark picked numbers differently from available numbers", () => {
    const pickedValues = [1, 4, 33, 12, 50];
    const r = render(<NumbersBoard pickedValues={pickedValues} />);
    expect(r.getAllByTestId("picked")).toHaveLength(5);
    expect(r.getAllByTestId("available")).toHaveLength(85);
  });

  it("should allow to toggle numbers", () => {
    const r = render(<NumbersBoard pickedValues={[]} />);
    expect(r.getAllByTestId("available")).toHaveLength(90);
    r.getByText("43").click();
    // expect 43 is toggled
    expect(r.getByText("43")).toHaveAttribute("data-testid", "picked");
    expect(r.getAllByTestId("available")).toHaveLength(89);
  });

  it("should allow to toggle back the last picked value", () => {
    const r = render(<NumbersBoard pickedValues={[]} />);
    r.getByText("42").click();
    r.getByText("41").click();
    expect(r.getAllByTestId("picked")).toHaveLength(2);
    // unpicking any value but the last one doesn't change it
    r.getByText("42").click();
    expect(r.getAllByTestId("picked")).toHaveLength(2);

    // unpicking last value toggle it back
    r.getByText("41").click();
    expect(r.getAllByTestId("picked")).toHaveLength(1);
  });

  it("should call onValuePicked when a value is picked", () => {
    const pick = jest.fn();
    const r = render(<NumbersBoard pickedValues={[]} onValuePicked={pick} />);
    r.getByText("24").click();
    r.getByText("42").click();
    expect(pick).toHaveBeenCalledTimes(2);
    expect(pick).toHaveBeenNthCalledWith(1, 24);
    expect(pick).toHaveBeenNthCalledWith(2, 42);
  });

  test("component is accessible", async () => {
    const { container } = render(<NumbersBoard pickedValues={[1, 4, 33]} />);
    const results = await axe(container.innerHTML);
    expect(results).toHaveNoViolations();
  });
});
