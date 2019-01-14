import * as React from "react";

// TODO: add hideStop, hidePlayPause, deal with PlayPause, callback when stopped (with time, callback when playPaused (with actual status and time)

interface ChronometerProps {
  startTime: Date;
  onStop?: (duration: number) => void;
}

interface ChronometerState {
  elapsedTime?: number;
  interval?: any;
}

class Chronometer extends React.PureComponent<ChronometerProps> {
  state: ChronometerState = {};

  componentWillUnmount() {
    this.stop();
  }

  componentDidUpdate(props: ChronometerProps, prevState: ChronometerState) {
    if (props.startTime && !prevState.interval) {
      const interval = setInterval(() => {
        const elapsedTime = new Date().getTime() - props.startTime.getTime();
        this.setState({ elapsedTime });
      }, 1000);
      this.setState({ interval });
    }
  }

  stop = () => {
    const { interval, elapsedTime } = this.state;
    const { onStop } = this.props;
    if (interval) {
      clearInterval(interval);
      this.setState({ interval: null });
      if (onStop && elapsedTime) onStop(elapsedTime);
    }
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
      .join(":");
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.displayElapsedTime()}</h2>
        <button onClick={this.stop}>⬛</button>
      </React.Fragment>
    );
  }
}

export default Chronometer;
