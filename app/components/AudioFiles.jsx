import React from 'react';

const AudioFiles = (props) => {
    return (
        <div>
            {
                props.files.map(file => {
                    return (
                    <div className="audiofile" key={file.stopTime}>
                        <audio key={file.startTime} controls>
                            <source src={file.blobURL}/>
                        </audio>
                        <div className="download-link"><a download="speech.mp3" key={file.stopTime} href={file.blobURL}><span className="glyphicon glyphicon-download" aria-hidden="true"></span></a></div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default AudioFiles