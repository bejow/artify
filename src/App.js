import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';
import {JsonDisplay} from './components/JsonDisplay';
import Sketch from './components/Sketch';
import {PlayHistory} from './components/PlayHistory';
//import './styles/style.css';
import MainView from './views/MainView';
import {LoginView} from './views/LoginView';

const API_PROFILE_URL = 'https://api.spotify.com/v1/me';
const API_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played'; 
const API_SAVED_SONGS_URL = 'https://api.spotify.com/v1/me/tracks';
const API_PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists';
const API_CURRENTLY_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const API_PLAY_URL = 'https://api.spotify.com/v1/me/player/play';//put
const API_PAUSE_URL = 'https://api.spotify.com/v1/me/player/pause';//put
const API_AVAILABLE_PLAYER_URL = 'https://api.spotify.com/v1/me/player/devices';
const API_AUDIO_FEATURES_URL = 'https://api.spotify.com/v1/audio-features';
const API_REFRESH_TOKEN_URL = 'https://spotify-artwork-backend.herokuapp.com/refresh_token';

class App extends Component {
  constructor(){
    super();
    this.state={
      serverData:{},
      access_token:null,
      refresh_token:null,
      response:null,
      currentSong:null,
      recentSongs:null,
      analyzedSong:null,
      developerMode:false,
    }
    this.fetchApi = this.fetchApi.bind(this);
    this.addTracksFromJsonResponse = this.addTracksFromJsonResponse.bind(this);
    this.addCurrentlyPlayingTrack = this.addCurrentlyPlayingTrack.bind(this);
    this.fetchAnalyseSong = this.fetchAnalyseSong.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount(){
    //get url parameters (spotify - tokens)
    let parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;
    let refresh_token = parsed.refresh_token;
    this.setState({
      access_token,
      refresh_token,
    }, () => {
      this.interval = setInterval(() => this.initSongData(), 3000);
    })
  }

  handleMouseEnter(e) {
    console.log('onMouseEnter', e.clientX, e.clientY)
  }
  
  handleMouseMove(e){
    console.log(
      'onMouseMove',
      e.nativeEvent.clientX, e.nativeEvent.clientY
    )
  }

  fetchAnalyseSong(songId){
    this.fetchApi(this.state.access_token, 
      API_AUDIO_FEATURES_URL+'?ids='+songId, 
      (data) => {
        this.setState({
          analyzedSong:data,
          loaded:true,
      })} )
  }

  refreshToken(){
    console.log("test");
    const options = {
      headers: { },
      method:'GET'
    }
    fetch(API_REFRESH_TOKEN_URL+`?refresh_token=${this.state.refresh_token}`, options)
      .then((response) => {
        console.log(response);
        console.log(response.body);
        return response.text();
      })
      .then((text) => {
        var data;
        text ? data = JSON.parse(text) : data = {};
        this.setState({
          access_token:data.access_token
        })
      })
    }

  initPlayHistory(){
    //requests the songdata for displaying a play history
    this.fetchApi(this.state.access_token, API_CURRENTLY_PLAYING_URL, this.addCurrentlyPlayingTrack, () => {
      this.fetchApi(this.state.access_token, API_RECENTLY_PLAYED_URL, this.addTracksFromJsonResponse, () =>{
        this.setState({
          loaded:true,
        })
      })
    });
  }

  initSongData(){
    //requests the songdata for displaying a play history
    this.fetchApi(this.state.access_token, API_CURRENTLY_PLAYING_URL, this.addCurrentlyPlayingTrack, () => {
      if (this.state.currentSong){
        this.fetchAnalyseSong(this.state.currentSong.id);
      }
    });
  }

  addTracksFromJsonResponse(jsonResponse, callback){
    var recentSongs = {};
    console.log(jsonResponse.items);
    for (let i = 0; i < jsonResponse.items.length; i++){
      recentSongs[jsonResponse.items[i].track.id] = jsonResponse.items[i].track;
      console.log(jsonResponse.items[i]);
    }
    this.setState({
      recentSongs
    },callback?callback:null)
  }

  setRefreshToken(jsonResponse){
    this.setState({
      access_token: jsonResponse.access_token
    })
  }

  addCurrentlyPlayingTrack(jsonResponse, callback){
    this.setState({
      currentSong: jsonResponse.item
    }, callback?callback:null)
  }

  postApi(bodyParams, access_token, url, processDataFunction){
    const options = {
      headers: { 
        'Authorization': 'Bearer ' + access_token,
        "Access-Control-Allow-Origin":"*",
    },
      method:'POST',
      mode:'cors',
      body: JSON.stringify(bodyParams)
    }
    fetch(url, options)
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((data) => {
      if(processDataFunction){
        processDataFunction(data);
      }
      else{
        this.setState({
          response:data,
        });
      }
    });
  }

  fetchApi(access_token, url, processDataFunction, callback){
    const options = {
      headers: { 'Authorization': 'Bearer ' + access_token },
      mode:'cors',
    }

    fetch(url, options)
    .then((response) => {
      console.log(response);
      if (!response.ok){
        this.refreshToken();
      }
      return response.text();
    })
    .then((text) => {
      var data;
      text ? data = JSON.parse(text) : data = {};
      if(processDataFunction){
        console.log("process function delivered")
        processDataFunction(data, callback);
      }
      else{
        this.setState({
          serverData:data,
        });
      }
    })
  }



  redirectToLogin(){
    window.location = window.location.href.includes("localhost")
      ?'http://localhost:8888/login'
      :'https://spotify-artwork-backend.herokuapp.com/login';
  }

  renderPlayHistory(){
    return this.state.loaded ? <PlayHistory 
        onSongClick={this.fetchAnalyseSong}
        currentSong={this.state.currentSong} 
        recentSongs={this.state.recentSongs}/>:
        <p>PlayHistory not loaded (Is your Spotify running?)</p>
  }

  renderApp(){
    if (this.state.developerMode){
      return(
        <div >
          style={{height:"100vh"}} 

          <Sketch/>
          <header className="App-header">
            <JsonDisplay json={this.state.analyzedSong}/>
            {this.renderPlayHistory()}
            <button onClick={() => this.fetchApi(this.state.access_token, API_PROFILE_URL)}>
              Fetch Profile
            </button> 
            <button onClick={() => this.fetchApi(this.state.access_token, API_RECENTLY_PLAYED_URL, this.addTracksFromJsonResponse)}>
              Fetch Recent Songs
            </button> 
            <button onClick={() => this.fetchApi(this.state.access_token, API_SAVED_SONGS_URL)}>
              Fetch Saved Songs
            </button>
            <button onClick={() => this.fetchApi(this.state.access_token, API_PLAYLISTS_URL)}>
              Fetch Playlists
            </button>
            <button onClick={() => this.fetchApi(this.state.access_token, API_AVAILABLE_PLAYER_URL)}>
              Get Player
            </button>
            <button onClick={() => this.fetchApi(this.state.access_token, API_CURRENTLY_PLAYING_URL, this.addCurrentlyPlayingTrack)}>
              Currently Played
            </button>
            {/*<JsonDisplay json={formatRecentlyPlayedSongs(this.state.serverData)}/>*/}
            <JsonDisplay json={this.state.serverData}/>
          </header>
        </div>
      )
    }
    else{
      
        if (this.state.access_token){
          return (
            <div>
            <MainView
              onStart={this.fetchAnalyseSong}
              currentSong={this.state.currentSong}
              currentSongData={this.state.analyzedSong}/>
              </div>
            );
        }
        else{
            return(
              <LoginView onClick={this.redirectToLogin}/>
            )
        }
    }
  }

  render() {
    console.log(this.state);
    return (
      	this.renderApp()
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
