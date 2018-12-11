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
                        onChange={this.props.onOptionChange}
                    />
                    <p>no stroke</p>
                </div>
                <div className="settingsRow">
                    <input 
                        type="checkbox"
                        checked={this.props.option2}
                        name="option2"
                        onChange={this.props.onOptionChange}
                    />
                    <p>option2</p>
                </div>
                <div className="settingsRow">
                    <input 
                        type="checkbox"
                        checked={this.props.option3}
                        name="option3"
                        onChange={this.props.onOptionChange}
                    />   
                    <p>option 3</p>
                </div> 
                <div className="settingsRow">                    
                    <input 
                        type="checkbox"
                        checked={this.props.option4}
                        name="option4"
                        onChange={this.props.onOptionChange}
                    />    
                    <p>option 4</p>
                </div>        
            </div>
        )
    }
}