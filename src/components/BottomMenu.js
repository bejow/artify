import React from 'react'
import {SongDisplay} from './SongDisplay'
export function BottomMenu(props){
    var cName = props.active ? "sidebar side" : "sidebar"
    return(
        <div className={cName}> 
    	    <SongDisplay song={props.song}/>
        </div>
    )
}