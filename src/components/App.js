import React, { Component } from "react";
import "../styles/App.css";
class Timer extends Component {
  constructor(props) {
    super(props);
    this.tid = 0;
    this.state = { time: 0, x: 0, y: 0, isStarted: false };
    this.moveTheBall = this.moveTheBall.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.moveTheBall, false);
  }
  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.tid);
      document.removeEventListener("keydown", this.moveTheBall);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveTheBall);
    clearInterval(this.tid);
  }

  moveTheBall(event) {
    let { x, y } = this.state;
    if (!this.state.isStarted) {
      return;
    }
    if (event.key === "ArrowDown" || event.keyCode === 40) {
      this.setState({ y: y + 5 });
    } else if (event.key === "ArrowUp" || event.keyCode === 38) {
      this.setState({ y: y - 5 });
    } else if (event.key === "ArrowRight" || event.keyCode === 39) {
      this.setState({ x: x + 5 });
    } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
      this.setState({ x: x - 5 });
    }
  }

  startGame() {
    this.setState({ isStarted: true });
    this.tid = setInterval(() => {
      let t = this.state.time;
      this.setState({ time: t + 1 });
    }, 1000);
  }

  render() {
    let ballPosition = { left: this.state.x + "px", top: this.state.y + "px" };
    return (
      <>
        <div className="ball" style={ballPosition}></div>
        <button className="start" onClick={this.startGame}>
          Start
        </button>
        <div className="hole"></div>
        <div className="heading-timer">{this.state.time}</div>
      </>
    );
  }
}

export default Timer;
