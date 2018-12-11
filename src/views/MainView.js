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
            option1:false,
            option2:false,
            option3:false,
            option4:false,
        }
        this.onStartButtonClick = this.onStartButtonClick.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
    }
    onSetAppState = (newState, cb) => this.setState(newState, cb);

    onOptionChange(event){
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

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
                    <SettingsDisplay 
                        picture={bensFace}
                        onOptionChange={this.onOptionChange}
                        option1={this.state.option1}
                        option2={this.state.option2}
                        option3={this.state.option3}
                        option4={this.state.option4}
                    />
                    
                    <div id="canvas" style={{marginLeft:200, width: "80%", height:"90%", position:"absolute"}}/>
                        <P5Wrapper
                            optionVal= {this.state.option1+this.state.option2+this.state.option3+this.state.option4}
                            sketch={sketchAlgorithm}
                            canvasHeight={this.state.canvasHeight}
                            canvasWidth={this.state.canvasWidth}
                            currentSong={this.props.currentSong}
                            currentSongData={this.props.currentSongData}
                        />
                    </div>
                <div className="lowerPart">
                    <button onClick={() => this.props.onStart(this.props.currentSong.id)} className="startButton">Start</button>
                </div>
            </div>
        )
    }
}