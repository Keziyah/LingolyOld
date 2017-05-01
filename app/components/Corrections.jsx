import React from 'react'
import HighlightedTextarea from 'react-highlighted-textarea'


const Corrections = (props) => {
    return (
        <div className="corrections">
            {
                this.state.showHighlights &&
                <HighlightedTextarea highlight={this.doHighlight} value={this.state.text} ></HighlightedTextarea>
            }

            {this.state.corrections.length ?
                this.state.corrections.map((thing, i) => {
                    return <p key={i}>{thing.message}</p>
                })
                : this.state.grammarMessage || "Grammar looks fine."
            }
        </div>
    )
}