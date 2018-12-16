import React from 'react';

export function LoginView(props){
    return(
        <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <button onClick={props.onClick}>Login in with Spotify</button>
        </div>
    )
}