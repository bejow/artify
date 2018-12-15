import {getRandomInt, parseValueToSteprange, positionAfterStep, isPositionOnCanvas, parseValueToColors, mapTo} from '../helper/drawHelperFunctions';
import {rainbowColors, warmColors, coldColors, mountainColors} from '../helper/colors';

export default function sketchAlgorithm(p5){
    let canvasHeight = 200;
    let canvasWidth = 200;
    var ellipseWidth = 80;
    var ellipseHeight = 80;
    var circleSize = 20;
    let newPosition;
    var stepRange = [1,5];
    var red = 10;
    var green = 10;
    var blue = 10;
    var currentX = 200;
    var currentY = 50;
    var currentDirection = 0 //0-up 1-upRight 2-right 3-rightDown 4-down 5-downLeft 6-left 7-leftUp
    var stepSize = 10;
    var steps = 0;
    var currentSong;
    var currentSongData;
    var optionVal;
    var loaded = false;
    var colorPalette;
    var currentColor = [255,255,255];
    var randomColorIndex;
  
    p5.setup = function () {
      //p5.createCanvas(canvasWidth, canvasHeight);
      p5.createCanvas(canvasWidth, canvasHeight);
      currentX = canvasWidth/2;
      currentY = canvasHeight/2;
      p5.frameRate(50);
      p5.textAlign(p5.CENTER, p5.CENTER);
    }
/*
    p5.mousePressed = function () {
        p5.setup();
        
    }
  */
    p5.myCustomRedrawAccordingToNewPropsHandler = function(props){
      console.log(props);
      canvasHeight = props.canvasHeight;
      canvasWidth = props.canvasWidth;
      currentSong = props.currentSong;
      optionVal = props.optionVal
      if (props.currentSongData){
          currentSongData = props.currentSongData.audio_features[0];
          if (!loaded){
            p5.background(255);
          }
          loaded = true;
          
      }
      console.log(currentSongData);      
    }
  
    p5.draw = function () {

        if (loaded){
            if(optionVal==0){
                spotifySongData(p5);
            }

            if(optionVal==2){
                randomBars(p5)
            }
            if(optionVal>=1){
                randomBarsNoStroke(p5)
            }
        }
        else {
            p5.background(155)
            p5.text("Song not loaded. Are you listening to music on spotify?", canvasWidth/2, canvasHeight/2)
            
        }
      
      /*p5.background(0);
      currentX = currentX - 5;
      if (currentX <= 40){
        currentX=p5.width - 40;
      }
      p5.ellipse(currentX, currentY, 80, 80)
    }
    */
  }
  
  function randomBars(p5){
    if (steps <= 0){
        do {
            blue = getRandomInt(0,255)
            red = getRandomInt(0,255)
            green = getRandomInt(0,255)
            steps = getRandomInt(stepRange[0], stepRange[1]);
            currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas(positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), p5.width, p5.height, 40))
    }
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.ellipse(currentX, currentY, ellipseWidth, ellipseHeight);
    p5.fill(red,green,blue);    
    p5.stroke(0);
    steps--;
  }

  function randomBarsNoStroke(p5){
    if (steps <= 0){
        do {
            blue = getRandomInt(0,255)
            red = getRandomInt(0,255)
            green = getRandomInt(0,255)
            steps = getRandomInt(stepRange[0], stepRange[1]);
            currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas(positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), p5.width, p5.height, 40))
    }
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.ellipse(currentX, currentY, ellipseWidth, ellipseHeight);
    p5.fill(red,green,blue);
    p5.noStroke();
    steps--;
  }

  function spotifySongData(p5){
    stepSize = mapTo(currentSongData.danceability, 0, 1, 3, 20); 
    colorPalette = parseValueToColors(currentSongData.energy)
    stepRange = parseValueToSteprange(currentSongData.tempo);
    ellipseHeight = mapTo(currentSongData.liveness, 0, 1, 10, 80);
    ellipseWidth = mapTo(currentSongData.liveness, 0, 1, 10, 80);
    if (steps <= 0){
        do {

            randomColorIndex = getRandomInt(0,colorPalette.length-1)
            currentColor = colorPalette[randomColorIndex];

            steps = getRandomInt(stepRange[0], stepRange[1]);
            currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas(positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), p5.width, p5.height, 40))
    }
    circleSize = getRandomInt(ellipseWidth*1.25, ellipseWidth*0.75)
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.noStroke();
    p5.fill(currentColor[0],currentColor[1],currentColor[2]);

    p5.ellipse(currentX, currentY, circleSize, circleSize);
    
    steps--;
  }
}



