import React from "react";

// TODO: styles

interface ChronometerProps {
  onStop?: (duration: number) => void;
  onPlay?: () => void;
  onPause?: (duration: number) => void;
  onReset?: () => void;
  hideStopButton?: boolean;
  hideResetButton?: boolean;
  hideAllButtonsWhenStopped?: boolean;
  buttonsAs?: any; // React.ComponentType<any>
  startNow?: boolean;
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
  static defaultProps = {
    buttonsAs: "button"
  };

  state: ChronometerState = { elapsedTime: 0, isPlaying: false };

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    if (this.props.startNow) {
      this.play();
    }
  }

  componentDidUpdate(prevProps: ChronometerProps) {
    if (!prevProps.startNow && this.props.startNow) {
      this.play();
    }
  }

  play = () => {
    const interval = setInterval(() => {
      const elapsedTime = this.state.elapsedTime + STEP_TIME;
      this.setState({ elapsedTime });
    }, STEP_TIME);
    this.setState({ interval, isPlaying: true });

    const { onPlay } = this.props;
    if (onPlay) onPlay();
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
    const { interval, elapsedTime } = this.state;
    if (interval) {
      clearInterval(interval);
      this.setState({ interval: null, isPlaying: false });
    }

    const { onPause } = this.props;
    if (onPause) onPause(elapsedTime);
  };

  reset = () => {
    this.setState({ elapsedTime: 0 });

    const { onReset } = this.props;
    if (onReset) onReset();
  };

  onTwoDigits = (value: number) => value.toString().padStart(2, "0");

  renderElapsedTime() {
    const { elapsedTime } = this.state;
    const elapsedTimeAsDate = new Date(elapsedTime);
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
    const { isPlaying, elapsedTime } = this.state;
    const {
      hideAllButtonsWhenStopped,
      hideStopButton,
      hideResetButton,
      buttonsAs: CustomButton
    } = this.props;

    if (hideAllButtonsWhenStopped && !isPlaying && elapsedTime) {
      return this.renderElapsedTime();
    }

    return (
      <React.Fragment>
        {this.renderElapsedTime()}
        {isPlaying ? (
          <CustomButton role="button" onClick={this.pause} data-testid="pause">
            ⏸️
          </CustomButton>
        ) : (
          <CustomButton role="button" onClick={this.play} data-testid="play">
            ▶
          </CustomButton>
        )}
        {!hideStopButton && (
          <CustomButton role="button" onClick={this.stop} data-testid="stop">
            ⬛
          </CustomButton>
        )}
        {!hideResetButton && (
          <CustomButton role="button" onClick={this.reset} data-testid="reset">
            🔃
          </CustomButton>
        )}
      </React.Fragment>
    );
  }
}

export default Chronometer;
