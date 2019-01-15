import React from "react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Chronometer from "./Chronometer";
import Button from "@material-ui/core/Button";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Chronometer", () => {
  describe("displayed time", () => {
    it("should measure time elapsed between startTime and the moment stop button is clicked", () => {
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
  });

  describe("play/pause button", () => {
    it("should call play callback when chronometer is started", () => {
      const playCallback = jest.fn();
      const pauseCallback = jest.fn();
      const r = render(
        <Chronometer onPlay={playCallback} onPause={pauseCallback} />
      );
      r.getByTestId("play").click();
      expect(playCallback).toHaveBeenCalledTimes(1);
      expect(pauseCallback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(200);
      r.getByTestId("pause").click();
      expect(playCallback).toHaveBeenCalledTimes(1);
      expect(pauseCallback).toHaveBeenCalledWith(200);
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

  describe("stop button", () => {
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

    it("should hide stop button if specified in props", () => {
      const r = render(<Chronometer hideStopButton />);
      expect(r.queryByTestId("stop")).toBeNull();
    });
  });

  describe("reset button", () => {
    it("should allow to reset chronometer, and call callback function if given", () => {
      const resetPressed = jest.fn();
      const r = render(<Chronometer onReset={resetPressed} />);
      r.getByTestId("play").click();
      jest.advanceTimersByTime(102343);
      r.getByTestId("reset").click();
      expect(r.getByTestId("display")).toHaveTextContent("00:00");
      expect(resetPressed).toHaveBeenCalledTimes(1);
    });

    it("should not be visible when hideResetButton is true", () => {
      const r = render(<Chronometer hideResetButton />);
      expect(r.queryByTestId("reset")).toBeNull();
    });
  });

  describe("hideAllButtons", () => {
    it("should hide all buttons once stopped", () => {
      const r = render(<Chronometer hideAllButtonsWhenStopped />);
      r.getByTestId("play").click();
      jest.advanceTimersByTime(200);
      r.getByTestId("stop").click();
      expect(r.queryByTestId("play")).toBeNull();
      expect(r.queryByTestId("pause")).toBeNull();
      expect(r.queryByTestId("stop")).toBeNull();
      expect(r.queryByTestId("reset")).toBeNull();
    });
  });

  describe("styling", () => {
    it("should allow to customize buttons", () => {
      const r = render(<Chronometer buttonsAs={Button} />);
      expect(r.getByRole("button")).toHaveLength(4);
    });
  });

  describe("controlled", () => {
    it("should be possible to start it from a prop", () => {});

    it("should start at first render if startNow is directly passed", () => {
      const r = render(<Chronometer />);
      // jest.advanceTimersByTime(6000);
      // expect(r.getByTestId("display")).toHaveTextContent("00:00");
      // r.rerender(<Chronometer />);
      // jest.advanceTimersByTime(6000);
      // expect(r.getByTestId("display")).toHaveTextContent("00:06");
    });
  });
});
