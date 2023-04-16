import React, { Component } from 'react';

const Context = React.createContext(null);
const ContextConsumer = Context.Consumer;

class ContextProvider extends Component{
  constructor(props) {
    super(props);

    this.state = {
        orientation:    { x: 0, y: 0, z: 0 },
        acceleration:   { x: 0, y: 0, z: 0 },
        accelerationGx: { x: 0, y: 0, z: 0 },
        gyroscope:      { x: 0, y: 0, z: 0 },
        isFlapping: false,
        bird: {x: 100, y: 350, width: 50, height: 50, anchor: {x: 1, y: 1}},
        pipe1: {x: 200, y: 600, width: 50, height: 200, anchor: {x: 1, y: 1}},
        pipe2: {x: 400, y: 600, width: 50, height: 200, anchor: {x: 1, y: 1}},
        pipe3: {x: 600, y: 600, width: 50, height: 200, anchor: {x: 1, y: 1}},

        setOrientation:    (x) => { this.setState({ orientation:    x }) },
        setAcceleration:   (x) => { this.setState({ acceleration:   x }) },
        setAccelerationGx: (x) => { this.setState({ accelerationGx: x }) },
        setGyroscope:      (x) => { this.setState({ gyroscope:      x }) },
        setIsFlapping:     (x) => { this.setState({ isFlapping:     x }) },
        setBird:           (x) => { this.setState({ bird:           x }) },
        setPipe:           (x) => { this.setState({ pipe:           x }) },
        setPipe1:          (x) => { this.setState({ pipe1:          x }) },
        setPipe2:          (x) => { this.setState({ pipe2:          x }) },
        setPipe3:          (x) => { this.setState({ pipe3:          x }) },
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, ContextProvider, ContextConsumer }