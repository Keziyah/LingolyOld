import React, { Component } from 'react';
import annyang from 'annyang'

//API help from https://speechlogger.appspot.com/developers/#external-links 
//and https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API?hl=en 

var final_transcript = '';
var recognizing = false;

if (!('webkitSpeechRecognition' in window)) {
    console.log("Speech API not supported here…")
} else { //Let’s do some cool stuff :)
    var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

recognition.onstart = function () {
    console.log("started listening")
    recognizing = true;

    //Listening (capturing voice from audio input) started.
    //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
};

recognition.onend = function () {
    console.log("finished listening")
    recognizing = false;
    //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
};

// recognition.onresult = function (event) { //the event holds the results
//     //Yay – we have results! Let’s check if they are defined and if final or not:
//     var interim_transcript = '';
//     if (typeof (event.results) === 'undefined') { //Something is wrong…
//         recognition.stop();
//         return;
//     }

//     for (var i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) { //Final results
//             final_transcript += event.results[i][0].transcript;
//             console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
//         } else {   //i.e. interim...
//             interim_transcript += event.results[i][0].transcript;

//             console.log("interim results: " + event.results[i][0].transcript);  //You can use these results to give the user near real time experience.
//             // SpeechWriter.prototype.getInterim(interim_transcript)
//         }
//     } //end for loop
// }

export default class SpeechWriter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            speech: ''
        }
        this.startButton = this.startButton.bind(this)
    }

    startButton(event) {
        recognition.start();
        //change the image to a slashed until the user approves the browser to listen and recognition actually starts. Then – we’ll change the image to ‘mic on’.
        console.log("STATE", this.state)
        this.onResult(event)
    }

    onResult(event) {
        recognition.onresult = function (event) { //the event holds the results
            //Yay – we have results! Let’s check if they are defined and if final or not:
            var interim_transcript = '';
            console.log("INTERIM", interim_transcript)
            console.log("ISTHERESTATE", this.state)
            if (typeof (event.results) === 'undefined') { //Something is wrong…
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) { //Final results
                    final_transcript += event.results[i][0].transcript;
                    console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
                } else {   //i.e. interim...
                    interim_transcript += event.results[i][0].transcript;
                    console.log("interim results: " + event.results[i][0].transcript)
                    console.log("STATE", this.state)
                    // this.setState({speech: interim_transcript})
                }
            } //end for loop
        }
    }

    stopButton(event) {
        recognition.stop()
    }

    render() {

        return (
            <div className="textarea" >
                <h1>hi there i am speechwriter </h1>
                <textarea value={this.state.speech} name="" id="" cols="30" rows="10" placeholder="write your speech here"></textarea>
                <button onClick={this.startButton}>Start listening</button>
                <button onClick={this.stopButton}>Stop listening</button>

            </div>
        )
    }
}

// onChange={e => this.setState({ speech: e.target.value })}


//To be used with annyang. 
    // startListening() {
    //     if (annyang) {

    //         console.log("started annyang yay")
    //         annyang.start({
    //             autoRestart: true,
    //             continuous: true
    //         })

    //         const commands = {
    //             "say hello": () => {
    //                 console.log("hey keziyah")
    //             },
    //             "write *stuff": (stuff) => {
    //                 console.log("this is the write command")
    //                 let tempSpeech = this.state.speech
    //                 this.setState({ speech: tempSpeech + stuff })
    //             }
    //         }

    //         annyang.addCommands(commands)
    //     }
    // }