import React from 'react';
import bensFace from '../images/ben_face.png';
import Sketch from '../components/Sketch';
import SettingsDisplay from '../components/SettingsDisplay';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch'
import sketchAlgorithm from '../sketches/sketchAlgorithm';
export default class MainView extends React.Component{
    constructor(){
        super();
        this.state = {
            draw:false,
            mouseX:16,
            canvasWidth:null,
            canvasHeight:null,
        }
        this.onStartButtonClick = this.onStartButtonClick.bind(this);
    }
    onSetAppState = (newState, cb) => this.setState(newState, cb);

    onStartButtonClick = () => {
        this.setState({
            mouseX: (this.state.mouseX+10)%500
        });
    }

    componentDidMount(){
        var height = document.getElementById('canvas').clientHeight
        var width = document.getElementById('canvas').clientWidth
        this.setState({
            canvasWidth: width,
            canvasHeight: height,
        });
    }

    render(){
        console.log(this.state);
        return(
            <div style={{height:"100vh"}}>
                <div className="upperPart">
                    <SettingsDisplay picture={bensFace}/>
                    
                    <div id="canvas" style={{width: "80%", height:"90%", position:"absolute"}}/>
                        <P5Wrapper
                            sketch={sketchAlgorithm}
                            canvasHeight={this.state.canvasHeight}
                            canvasWidth={this.state.canvasWidth}
                        />
                    </div>
                <div className="lowerPart">
                    <button onClick={this.onStartButtonClick} className="startButton">Start</button>
                </div>
            </div>
        )
    }
}