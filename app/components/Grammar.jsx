import React, { Component } from 'react'
import axios from 'axios'
import rp from 'request-promise'

export default class Grammar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            disabled: true,
            corrections: [], 
            grammarMessage: ''
        }
        this.readyForCheck = this.readyForCheck.bind(this)
        this.checkGrammar = this.checkGrammar.bind(this)
    }

    componentWillMount() {
        const copy = this.props.transcript + ""
        this.setState({ text: copy })
    }

    readyForCheck(e) {
        this.setState({ text: e.target.value, disabled: false })
        console.log(e.target.defaultValue, "EVENT")
    }

    checkGrammar(e) {
        e.preventDefault()
        const newtext = this.state.text

        axios.get('https://languagetool.org/api/v2/check?text=' + newtext + '&language=en')
            .then(res => {
                this.setState({ corrections: res.data.matches })
            })
            .catch(console.error)

            if(!this.state.corrections.length) {
                this.setState({grammarMessage: "Grammar looks fine."})
            } else {
                this.setState({grammarMessage: "Checking..."})
            }
    }

    render() {
        const okMessage = <h4>Grammar looks fine.</h4>
        return (
            <div>
                <form onSubmit={this.checkGrammar}>
                    <textarea onChange={this.readyForCheck} value={this.state.text} name="checker" id="grammarCheck" cols="30" rows="10"></textarea>
                    <button type="submit" disabled={this.state.disabled}>{this.state.disabled ? "Edit your speech first." : "Check Grammar"}</button>
                </form>

                <div className="corrections">
                    {this.state.corrections.length ?
                    this.state.corrections.map(thing => {
                         return <p key={thing.message}>{thing.message}</p>
                    })
                    : this.state.grammarMessage
                    }
                </div>
            </div>
        )
    }
}

//A person clicks show grammar checkers and this text area appears with what they said
//Check grammar is disabled until they edit their speech. 
//Once they edit their speech, or once the value of the text area has been changed
//  the check grammar button is enabled
//The person clicks check grammar which makes the api request. 

//defaultValue={this.props.transcript}

// axios.post('https://languagetool.org/api/v2/check', {
//            data: {text: text, language: "en"}, 
//            headers: { "Content-Type": 'application/json'}
//         })

 // let options = {
        //     method: 'GET',
        //     uri: 'https://languagetool.org/api/v2/check?text=' + newtext + '&language=en',
        //     text: newtext,
        //     language: 'en',
        //     header: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'multipart/form-data'
        // },
        //     json: true // Automatically stringifies the body to JSON
        // }

        // rp(options)
        //     .then(function (parsedBody) {
        //         console.log("YAY", parsedBody)
        //     })
        //     .catch(function (err) {
        //         console.error(err)
        //     });