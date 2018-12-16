import React from 'react'

export function BurgerButton(props){
    var iconClassName = props.active ? "fa-window-close" : "fa fa-bars";
    var buttonClassName = props.active ? "btnc btn" : "btn";
    return(
        <button className={buttonClassName} onClick={props.onClick}><i className={iconClassName} ></i></button>
    )
}