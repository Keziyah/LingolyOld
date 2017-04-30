import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import Recorder from './Recorder'
import Timer from './Timer'
import Grammar from './Grammar'


const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

class SpeechWriter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recording: false,
            timing: false,
            grammar: false
        }

        this.record = this.record.bind(this)
        this.timer = this.timer.bind(this)
        this.checkGrammar = this.checkGrammar.bind(this)
    }

    record() {
        this.setState({ recording: true })
    }

    timer() {
        this.setState({ timing: true })
    }

    checkGrammar() {
        this.setState({grammar: !this.state.grammar})
    }

    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props
        if (!browserSupportsSpeechRecognition) {
            return null
        }
        return (
            <div className="textarea" >
                <div>
                    <textarea rows="10" cols="60" placeholder="Start talking or write your speech here." value={transcript}></textarea>
                </div>
                <button onClick={resetTranscript}>Reset</button>
                <button>Save</button>
                <button onClick={this.checkGrammar}>Show Grammar Checker</button>
                <button onClick={this.record}>Show Recorder</button>
                <button onClick={this.timer}>Show Timer</button>
                <Link to="/"><button onClick={() => window.location.reload()}>Exit</button></Link>
                {this.state.recording && <Recorder />}
                {this.state.timing && <Timer />}
                {this.state.grammar && <Grammar transcript={transcript}/>}
            </div>
        )
    }
}

//Above: I have to reload the page in order to get recognition to stop listening. 
//Otherwise I do not know how to turn recognition off. 

SpeechWriter.propTypes = propTypes
export default SpeechRecognition(SpeechWriter)
