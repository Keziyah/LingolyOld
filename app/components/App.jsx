import React, { Component } from 'react'

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>Hello I am the main app component</h1>
               {this.props.children}
            </div>
        )
    }
}

export default App