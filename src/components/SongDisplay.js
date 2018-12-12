import React from 'react';

export const SongDisplay = (props) => {
    return(
        <div onClick={props.onClick ? () => {props.onClick(props.song.id)} : () => {console.log("No on click method")}} style={{textAlign:'center', }}>
            <h3>{props.song ? props.song.name : "Cannot be loaded"}</h3>
            <p>{props.song ? props.song.artists[0].name : "empty"}</p>
        </div>
    )
}