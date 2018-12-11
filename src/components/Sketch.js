import React from 'react';

export default class Sketch extends React.Component{
    constructor(){
        super();
        this.state = {
            x: 50,
            y: 50,
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(event){
        this.setState({
            x: event.clientX,
            y: event.clientY,
        })
    }

    render(){
        return(
            <svg width="100%" flexGrow={1} onMouseMove={this.handleMouseMove}>
                <circle cx={this.state.x} cy={this.state.y} r="40" stroke="black" fill="white"/>
            </svg>
        )
    }
}