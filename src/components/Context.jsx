import React, { Component } from 'react';

const Context = React.createContext(null);
const ContextConsumer = Context.Consumer;


class ContextProvider extends Component{
  constructor(props) {
    super(props);

    this.state = {
        orientation: {
                x: 0, y: 0, z: 0
        },
        acceleration: {
                x: 0, y: 0, z: 0
        },
        accelerationGx: {
                x: 0, y: 0, z: 0
        },
        gyroscope: {
                x: 0, y: 0, z: 0
        },
        isFlapping: false,

        setOrientation: (x) => {
                this.setState({ orientation: x });
        },
        setAcceleration: (x) => {
                this.setState({ acceleration: x });
        },
        setAccelerationGx: (x) => {
                this.setState({ accelerationGx: x });
        },
        setGyroscope: (x) => {
                this.setState({ gyroscope: x });
        },
        setIsFlapping: (x) => {
                this.setState({ isFlapping: x });
        }
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