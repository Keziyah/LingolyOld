import React from 'react';

const AudioFiles = (props) => {
    return (
        <div>
            {
                props.files.map(file => {
                    return (
                    <div key={file.stopTime}>
                        <audio key={file.startTime} controls>
                            <source src={file.blobURL}/>
                        </audio>
                        <a download="speech.mp3" key={file.stopTime} href={file.blobURL}><span className="glyphicon glyphicon-download" aria-hidden="true"></span></a>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default AudioFiles