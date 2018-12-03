import React from 'react';

export const SongDisplay = (props) => (
    
    <div onClick={() => {props.onClick(props.song.id)}} style={{marginBottom:10, textAlign:'center', backgroundColor:'#464D59'}}>
        <h3>{props.song.name}</h3>
        <p>{props.song.artists[0].name}</p>
    </div>
)