import React from "react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Chronometer from "./Chronometer";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Chronometer", () => {
  it("should measure time elapsed between startTime and the moment the Stop button is clicked", () => {
    const r = render(<Chronometer />);
    r.getByTestId("play").click();
    jest.advanceTimersByTime(12003);
    expect(r.getByTestId("display")).toHaveTextContent("00:12");
  });

  it("should display hours when more than an hour elapsed", () => {
    const r = render(<Chronometer />);
    r.getByTestId("play").click();
    jest.advanceTimersByTime(3603400);
    r.getByTestId("stop").click();
    expect(r.getByTestId("display")).toHaveTextContent("01:00:03");
  });

  it("should invoke callback when stop button is clicked, and should not count elapsed time after", () => {
    const chronoStopped = jest.fn();
    const r = render(<Chronometer onStop={chronoStopped} />);
    r.getByTestId("play").click();
    jest.advanceTimersByTime(12003);
    expect(chronoStopped).not.toHaveBeenCalled();

    r.getByTestId("stop").click();

    jest.advanceTimersByTime(12312003);
    expect(r.getByTestId("display")).toHaveTextContent("00:12");
    expect(chronoStopped).toHaveBeenCalledTimes(1);
    expect(chronoStopped).toHaveBeenCalledWith(12000);
  });

  it("should call stop callback on unmount if chrono is playing", () => {
    const chronoStopped = jest.fn();
    const notLaunched = render(<Chronometer onStop={chronoStopped} />);
    jest.advanceTimersByTime(300);
    notLaunched.unmount();
    expect(chronoStopped).not.toHaveBeenCalled();

    const r = render(<Chronometer onStop={chronoStopped} />);
    r.getByTestId("play").click();
    jest.advanceTimersByTime(12300);
    r.unmount();
    expect(chronoStopped).toBeCalledWith(12300);
  });

  it("should display Play button when chronometer is paused, Pause button else", () => {
    const r = render(<Chronometer />);
    expect(r.queryByTestId("play")).toBeInTheDocument();
    expect(r.queryByTestId("pause")).toBeNull();
    r.getByTestId("play").click();
    expect(r.queryByTestId("play")).toBeNull();
    expect(r.queryByTestId("pause")).toBeInTheDocument();
  });
});
