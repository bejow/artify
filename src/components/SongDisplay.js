import React from 'react';

export const SongDisplay = (props) => (
    <div style={{marginBottom:10, textAlign:'center'}}>
        <h3>{props.song.name}</h3>
        <p>{props.song.artists[0].name}</p>
    </div>
)