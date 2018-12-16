import React from 'react';
import bensFace from '../images/ben_face.png';
import Sketch from '../components/Sketch';
import SettingsDisplay from '../components/SettingsDisplay';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch'
import sketchAlgorithm from '../sketches/sketchAlgorithm';
//import {NavSidebar} from '../components/NavSidebar.js'
import {MainContainer} from '../components/MainContainer.js';
import {NavSidebar} from '../components/NavSidebar.js';
import {SongDisplay} from '../components/SongDisplay';
import {BottomMenu} from '../components/BottomMenu';
import { BurgerButton } from '../components/BurgerButton';

export default class MainView extends React.Component{
    constructor(){
        super();
        this.state = {
            draw:false,
            sidebar:false,
            save:false,
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
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.save = this.save.bind(this);
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
        /*
        var height = document.getElementById('canvas').clientHeight
        var width = document.getElementById('canvas').clientWidth
*/
        var height = this.refs.canvas.clientHeight;
        var width = this.refs.canvas.clientWidth;
        this.setState({
            canvasWidth: width,
            canvasHeight: height,
        });
    }

    save(){
        this.setState({
            save: true
        }, () => this.setState({
            save:false
        }))
    }

    toggleSidebar(){
        this.setState({
            sidebar: (this.state.sidebar+1)%2,
        });
    }

    render(){
        console.log(this.state.save);
        return(
            <div>
               {/* <NavSidebar/>*/}
                    <div onClick={this.toggleSidebar} id="main">
                        <a style={{backgroundColor:"white"}} href="/videos/artify_v1.mp4" className="logotype">ART<span>IFY</span></a>
                        <div ref="canvas" id="canvas" style={{height:"100vh"}} >
                            <P5Wrapper
                                optionVal= {this.state.option1+this.state.option2+this.state.option3+this.state.option4}
                                sketch={sketchAlgorithm}
                                canvasHeight={this.state.canvasHeight}
                                canvasWidth={this.state.canvasWidth}
                                currentSong={this.props.currentSong}
                                currentSongData={this.props.currentSongData}
                                save={this.state.save}
                            />
                        </div>
                        <div>
                            <BurgerButton active={this.state.sidebar} onClick={this.toggleSidebar}/>
                            <button className={this.state.sidebar?"btn btnc download":"btn download"} onClick={this.save}><i className="fa fa-download"></i></button>
                            <BottomMenu song={this.props.currentSong} onClick={this.toggleSidebar} onSave={this.save} active={this.state.sidebar}/>
                            </div>
                </div>
            </div>
        )
        /*
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
        */
    }
}