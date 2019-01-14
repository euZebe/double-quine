import * as React from "react";

// TODO: add hideStop, hidePlayPause, deal with PlayPause, callback when stopped (with time), hide all buttons when stopped, callback when playPaused (with actual status and time)

interface ChronometerProps {
  onStop?: (duration: number) => void;
}

interface ChronometerState {
  elapsedTime: number;
  pauseStartTime?: number;
  pausedTime?: number;
  interval?: any;
  isPlaying: boolean;
}

const STEP_TIME = 100;

class Chronometer extends React.PureComponent<ChronometerProps> {
  state: ChronometerState = { elapsedTime: 0, isPlaying: false };

  componentWillUnmount() {
    this.stop();
  }

  play = () => {
    const interval = setInterval(() => {
      const elapsedTime = this.state.elapsedTime + STEP_TIME;
      this.setState({ elapsedTime });
    }, STEP_TIME);
    this.setState({ interval, isPlaying: true });
  };

  stop = () => {
    const { interval, elapsedTime } = this.state;
    const { onStop } = this.props;
    if (interval) {
      clearInterval(interval);
      this.setState({ interval: null, isPlaying: false });
      if (onStop && elapsedTime) onStop(elapsedTime);
    }
  };

  pause = () => {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
      this.setState({ interval: null, isPlaying: false });
    }
  };

  reset = () => {
    this.setState({ elapsedTime: 0 });
  };

  onTwoDigits = (value: number) => value.toString().padStart(2, "0");

  displayElapsedTime() {
    const { elapsedTime } = this.state;
    if (!elapsedTime) return "00:00";
    const elapsedTimeAsDate = new Date(elapsedTime);
    return [
      elapsedTimeAsDate.getUTCHours(),
      elapsedTimeAsDate.getMinutes(),
      elapsedTimeAsDate.getSeconds()
    ]
      .map(this.onTwoDigits)
      .filter((d, index) => index !== 0 || d !== "00")
      .join(":");
  }

  render() {
    const { isPlaying } = this.state;
    return (
      <React.Fragment>
        <h2 data-testid="display">{this.displayElapsedTime()}</h2>
        {isPlaying ? (
          <button onClick={this.pause} data-testid="pause">
            ⏸️
          </button>
        ) : (
          <button onClick={this.play} data-testid="play">
            ▶
          </button>
        )}
        <button onClick={this.stop} data-testid="stop">
          ⬛
        </button>
        <button onClick={this.reset} data-testid="reset">
          🔃
        </button>
      </React.Fragment>
    );
  }
}

export default Chronometer;
