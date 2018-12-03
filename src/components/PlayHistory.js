import React from 'react';
import {SongDisplay} from './SongDisplay';

export const PlayHistory = (props) => (
    
    <div>
        {console.log(props)}
        <h1>Current Song:</h1>
        <SongDisplay song={props.currentSong}/>
        <h2>History:</h2>
        <div>
            {Object.keys(props.recentSongs).map((key) => <SongDisplay song={props.recentSongs[key]}/>)}
        </div>
    </div>
)