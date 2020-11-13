import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0 };
    this.handleStart = () => {
      this.start = Date.now();
      this.interval = setInterval(
        () =>
          this.setState({ time: Math.floor((Date.now() - this.start) / 1000) }),
        1000
      );
      document.addEventListener("keydown", () => this.handleKeys(event));
    };
    this.handleKeys = (event) => {
      if (
        !(Number(this.state.x) === 255 || Number(this.state.y) === 250) ||
        !(Number(this.state.x) === 250 || Number(this.state.y) === 255)
      ) {
        if (event.key === "ArrowRight") {
          let xCopy = this.state.x;
          xCopy += 5;
          this.setState({ x: xCopy });
          return;
        }
        if (event.key === "ArrowDown") {
          let yCopy = this.state.y;
          yCopy += 5;
          this.setState({ y: yCopy });
          return;
        }
        if (event.key === "ArrowLeft") {
          let xCopy = this.state.x;
          xCopy -= 5;
          this.setState({ x: xCopy });
          return;
        }
        if (event.key === "ArrowUp") {
          let yCopy = this.state.y;
          yCopy -= 5;
          this.setState({ y: yCopy });
          return;
        }
      } else {
        clearInterval(this.interval);
        return;
      }
    };
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = setInterval(
      () =>
        this.setState({ time: Math.floor((Date.now() - this.start) / 1000) }),
      1000
    );

    document.removeEventListener("keydown");
  }

  render() {
    return (
      <>
        <div
          className="ball"
          style={{ left: `${this.state.x}px`, top: `${this.state.y}px` }}
        ></div>
        <div className="heading-timer">{this.state.time}</div>

        <div className="hole"></div>

        <button className="start" onClick={() => this.handleStart()}>
          start
        </button>
      </>
    );
  }
}

export default Timer;
