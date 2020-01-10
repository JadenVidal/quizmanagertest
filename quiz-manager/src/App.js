import React, { Component } from 'react';

    class App extends Component {
      constructor() {
        super();
        this.state = {
          count: 1,
        }
      }

      makeIncrementer = amount => () =>
        this.setState(prevState => ({
          count: prevState.count + amount,
        }));

      increment = this.makeIncrementer(1);

      decrement = this.makeIncrementer(-1);

      render() {
        return (
          <div>
            <p>Count: {this.state.count}</p>
            <button className="increment" onClick={this.increment}>Increment count</button>
            <button className="decrement" onClick={this.decrement}>Decrement count</button>
          </div>
        )
      }
    }

    export default App;