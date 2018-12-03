import React from 'react';
import {SongDisplay} from './SongDisplay';

export const PlayHistory = (props) => (
    
    <div>
        <h1>Current Song:</h1>
        <SongDisplay onClick={props.onSongClick} song={props.currentSong}/>
        <h2>History:</h2>
        <p>(click on a song to display the song analysis at the top)</p>
        <div>
            {Object.keys(props.recentSongs).map((key) => <SongDisplay onClick={props.onSongClick} song={props.recentSongs[key]}/>)}
        </div>
    </div>
)