import React from 'react';
export default class SettingsDisplay extends React.Component{
    constructor(){
        super();
        this.state = {
            option1: false,
            option2: false,
            option3: false,
            option4: false,
        }
    }

    render(){
        return(
            <div className="settingsBox">
                <img className="profilePicture" src={this.props.picture}></img>
                <div className="settingsRow">
                    <input 
                        type="checkbox"
                        checked={this.props.option1}
                        name="option1"
                    />
                    <p>option 1</p>
                </div>
                <div className="settingsRow">
                    <input 
                        type="checkbox"
                        checked={this.props.option1}
                        name="option1"
                    />
                    <p>option 2</p>
                </div>
                <div className="settingsRow">
                    <input 
                        type="checkbox"
                        checked={this.props.option1}
                        name="option1"
                    />   
                    <p>option 3</p>
                </div> 
                <div className="settingsRow">                    
                    <input 
                        type="checkbox"
                        checked={this.props.option1}
                        name="option1"
                    />    
                    <p>option 4</p>
                </div>        
            </div>
        )
    }
}