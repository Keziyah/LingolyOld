import React, {Component} from 'react'
import axios from 'axios'

export default class Grammar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '', 
            disabled: true
        }
        this.readyForCheck = this.readyForCheck.bind(this)
        this.checkGrammar = this.checkGrammar.bind(this)
    }
   
    componentWillMount() {
        const copy = this.props.transcript + ""
        this.setState({text: copy})
    }

    readyForCheck(e) {
      this.setState({text: e.target.value, disabled: false}) 
      console.log(e.target.defaultValue, "EVENT")
    }

    checkGrammar(e) {
        e.preventDefault()
        const text = this.state.text    
        axios.post('https://languagetool.org/api/v2/check', {
           data: {text: text, language: "en"}, 
           headers: { "Content-Type": 'application/x-www-form-urlencoded'}
        })
        .then(res => console.log(res.data))   
        .catch(console.error) 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.checkGrammar}>
                <textarea onChange={this.readyForCheck} value={this.state.text} name="checker" id="grammarCheck" cols="30" rows="10"></textarea>
                <button type="submit" disabled={this.state.disabled}>{this.state.disabled ? "Edit your speech first." : "Check Grammar"}</button>
                </form>
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