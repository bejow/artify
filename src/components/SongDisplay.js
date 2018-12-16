import React from 'react';

export const SongDisplay = (props) => {
    return(
        <div onClick={props.onClick ? () => {props.onClick(props.song.id)} : () => {console.log("No on click method")}} style={{textAlign:'center'}}>
            <h3 className="songDisplayText">{props.song ? props.song.name : "Cannot be loaded"}</h3>
            <p className="songDisplayText">{props.song ? props.song.artists[0].name : "empty"}</p>
        </div>
    )
}
