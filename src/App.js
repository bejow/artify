import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';
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
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    }

    fetch('https://api.spotify.com/v1/me', options)
    .then((response) => {
      response.json();
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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
