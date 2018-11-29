import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';
import {JsonDisplay} from './components/JsonDisplay';
//test

const API_PROFILE_URL = 'https://api.spotify.com/v1/me';
const API_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played'; 
const API_SAVED_SONGS_URL = 'https://api.spotify.com/v1/me/tracks';
const API_PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists';

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
    let access_token = parsed.access_token;
    let refresh_token = parsed.refresh_token;
    this.setState({
      access_token,
      refresh_token,
    })
    this.fetchApi = this.fetchApi.bind(this);

  }

  fetchApi(access_token, base_url, params){
    const options = {
      headers: { 'Authorization': 'Bearer ' + access_token }
    }

    fetch(base_url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        serverData:data,
      })
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.fetchApi(this.state.access_token, API_PROFILE_URL)}>
            Fetch Profile
          </button> 
          <button onClick={() => this.fetchApi(this.state.access_token, API_RECENTLY_PLAYED_URL)}>
            Fetch Recent Songs
          </button> 
          <button onClick={() => this.fetchApi(this.state.access_token, API_SAVED_SONGS_URL)}>
            Fetch Saved Songs
          </button>
          <button onClick={() => this.fetchApi(this.state.access_token, API_PLAYLISTS_URL)}>
            Fetch Playlists
          </button>
          {/*<JsonDisplay json={formatRecentlyPlayedSongs(this.state.serverData)}/>*/}
          <JsonDisplay json={this.state.serverData}/>
        </header>
      </div>
    );
  }
}

function formatRecentlyPlayedSongs(apiResponse){
  var recentSongs = {};
  var counter = 1;
  for (var item in apiResponse.items){
    recentSongs[counter] = {
      name: apiResponse.items[item].track.name,
      artist: apiResponse.items[item].track.artists[0].name,
      album: apiResponse.items[item].track.album.name,
      id: apiResponse.items[item].track.id,
    }
    counter++;
  }
  return recentSongs
}

export default App;
