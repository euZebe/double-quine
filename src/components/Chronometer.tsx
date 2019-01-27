import React from "react";

interface ChronometerProps {
  onStop: (duration: number) => void;
  startNow?: boolean;
  timeFromPastSession: number;
}

interface ChronometerState {
  currentInterval?: any;
  elapsedTime?: number;
}

const STEP_TIME = 1000;

const containerStyle = {
  gridArea: "chrono",
  alignSelf: "start",
  justifySelf: "end"
};

class Chronometer extends React.PureComponent<
  ChronometerProps,
  ChronometerState
> {
  static defaultProps = {
    timeFromPastSession: 0
  };

  state = {
    startTime: undefined,
    currentInterval: undefined,
    elapsedTime: undefined
  };

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    if (this.props.startNow) {
      this.play();
    }
  }

  componentDidUpdate(previousProps: ChronometerProps) {
    if (!previousProps.startNow && this.props.startNow) {
      this.play();
    }
  }

  play = () => {
    const startTime = new Date();
    const currentInterval = setInterval(() => {
      const elapsedTime = new Date().getTime() - startTime.getTime();
      if (elapsedTime === 0) debugger;
      this.setState({ elapsedTime });
    }, STEP_TIME);
    this.setState({ currentInterval });
  };

  stop = () => {
    clearInterval(this.state.currentInterval);

    const { timeFromPastSession } = this.props;
    const { elapsedTime } = this.state;
    if (elapsedTime) {
      this.props.onStop(elapsedTime + timeFromPastSession * 1000);
    }
  };

  onTwoDigits = (value: number) => value.toString().padStart(2, "0");

  renderElapsedTime() {
    const { timeFromPastSession } = this.props;
    const elapsedTime = this.state.elapsedTime || 0;
    const elapsedTimeAsDate = new Date(
      elapsedTime + timeFromPastSession * 1000
    );
    const formattedTime = [
      elapsedTimeAsDate.getUTCHours(),
      elapsedTimeAsDate.getMinutes(),
      elapsedTimeAsDate.getSeconds()
    ]
      .map(this.onTwoDigits)
      .filter((d, index) => index !== 0 || d !== "00")
      .join(":");

    return <h2 data-testid="display">{formattedTime}</h2>;
  }

  render() {
    return <div style={containerStyle}>{this.renderElapsedTime()}</div>;
  }
}

export default Chronometer;
