import React, { Component } from 'react'
import { Link } from 'react-router'
import SpeechWriter from './SpeechWriter'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listening: false
        }

        this.listenAndWrite = this.listenAndWrite.bind(this)
    }

    listenAndWrite() {
        this.setState({ listening: !this.state.listening })
    }

    render() {
        return (
            <div className="app">
                <h1>Hello I am the main app component</h1>
                <Link to="/write"><button>Start speech</button></Link>
            </div>
        )
    }
}

export default App