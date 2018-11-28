import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';
import {JsonDisplay} from './components/JsonDisplay';
//test

class App extends Component {
  constructor(){
    super();
    this.state={
      serverData:{},
      access_token:null,
      refresh_token:null,
    }
  }

  componentDidMount(){
    
    let parsed = queryString.parse(window.location.search);
    console.log(parsed);
    let access_token = parsed.access_token;
    let refresh_token = parsed.refresh_token;
    
    const options = {
      headers: { 'Authorization': 'Bearer ' + access_token }
    }

    fetch('https://api.spotify.com/v1/me', options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        serverData:data,
        access_token,
        refresh_token,
      })
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <JsonDisplay json={this.state.serverData}/>
        </header>
      </div>
    );
  }
}

export default App;
