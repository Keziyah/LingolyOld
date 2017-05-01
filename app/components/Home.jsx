import React, { Component } from 'react'
import {Link} from 'react-router'
import Recorder from './Recorder'
import Timer from './Timer'
import SpeechWriter from './SpeechWriter'

export default class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="app">

                {/*Da Navbar*/}
                <nav className="navbar navbar-default" id="mynav">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" onClick={() => window.location.reload()}>lingoly</Link>
                        </div>
                    </div>
                </nav>

                <div className="row">

                    <div className="col-md-3" id="controls">
                        <h3 id="recorder-header">Recorder</h3>
                        <Recorder />
                        <h3 id="timer-header">Timer</h3>
                        <Timer/>
                    </div>

                    <div className="col-md-5">
                        <SpeechWriter />
                    </div>
                </div>
            </div>
        )
    }
}