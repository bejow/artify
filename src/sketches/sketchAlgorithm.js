import {getRandomInt, positionAfterStep, isPositionOnCanvas} from '../helper/drawHelperFunctions';

export default function sketchAlgorithm(p5, id="canvas"){
    let canvasHeight = 200;
    let canvasWidth = 200;
    let newPosition;
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
  
    p5.setup = function () {
      p5.createCanvas(canvasWidth, canvasHeight);
      currentX = canvasWidth/2;
      currentY = canvasHeight/2;
      p5.frameRate(60);
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
      if (props.currentSongData) currentSongData = props.currentSongData.audio_features[0];
      console.log(currentSongData);      
    }
  
    p5.draw = function () {
        if(optionVal==0){
            randomBars(p5)
        }
        if(optionVal>=1){
            randomBarsNoStroke(p5)
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
            steps = getRandomInt(1, 5);
            currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas(positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), p5.width, p5.height, 40))
    }
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.ellipse(currentX, currentY, 80, 80);
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
            steps = getRandomInt(5, 20);
            currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas(positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), p5.width, p5.height, 40))
    }
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.ellipse(currentX, currentY, 80, 80);
    p5.fill(red,green,blue);
    p5.noStroke();
    steps--;
  }
}



