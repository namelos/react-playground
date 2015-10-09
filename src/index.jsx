import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { val: 'init' };
    }
    handleClick = e => this.setState({ val: this.refs.name.value });
    render = () => <div>
        <input type="text" ref="name" />
        <button onClick={ this.handleClick }>name</button>
        <p>{ this.state.val }</p>
    </div>
}

render(<App />,
  document.getElementById('root'));
