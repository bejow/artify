export default function sketchAlgorithm(p5, id="canvas"){
    let canvasHeight = 200;
    let canvasWidth = 200;
    let newPosition;
    var currentX = 200;
    var currentY = 50;
    var currentDirection = 0 //0-up 1-upRight 2-right 3-rightDown 4-down 5-downLeft 6-left 7-leftUp
    var stepSize = 5;
    var steps = 10
  
    p5.setup = function () {
      p5.createCanvas(canvasWidth, canvasHeight);
      currentX = canvasWidth/2;
      currentY = canvasHeight/2;
      p5.frameRate(60);
    }
  
    p5.myCustomRedrawAccordingToNewPropsHandler = function(props){
      console.log(props);
      canvasHeight = props.canvasHeight;
      canvasWidth = props.canvasWidth;
    }
  
    p5.draw = function () {
        p5.background(0);
      algorithm(p5)
      /*p5.background(0);
      currentX = currentX - 5;
      if (currentX <= 40){
        currentX=p5.width - 40;
      }
      p5.ellipse(currentX, currentY, 80, 80)
    }
    */
  }
  
  function algorithm(p5){
    if (steps <= 0){
        do {
        steps = getRandomInt(5, 20);
        currentDirection = getRandomInt(0,7);
        } while (!isPositionOnCanvas( positionAfterStep(currentX, currentY, currentDirection, stepSize*steps), 40))
    }
    newPosition = positionAfterStep(currentX, currentY, currentDirection, stepSize);
    console.log(newPosition)
    console.log(currentDirection)
    currentX = newPosition[0];
    currentY = newPosition[1];
    p5.ellipse(currentX, currentY, 80, 80);
    steps--;
  }

  function isPositionOnCanvas(position, padding){
      if(position[0] >= 0+padding && position[0] <= p5.width - padding){
          //x is on the canvas
          if(position[1] >= 0+padding && position[1] <= p5.height - padding){
              //y is also on canvas
              return true;
          }
      }
      return false;
  }
}

function getRandomInt(min, max) {
    //returns a random int between (inclusive) min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function positionAfterStep(currentX, currentY, direction, steps){
    //applies a direction with steps on a 2d position on the canvas
    switch(direction){
        case 0:
        //up
            return [currentX, currentY + steps];
        case 1:
        //upRight
            return [currentX + steps, currentY + steps];
        case 2:
        //right
            return [currentX + steps, currentY];
        case 3:
        //downRight
            return [currentX + steps, currentY - steps];
        case 4:
        //down
            return [currentX, currentY - steps];         
        case 5:
        //downLeft
            return [currentX - steps, currentY - steps];
        case 6:
        //left
            return [currentX - steps, currentY];  
        case 7:
        //upLeft
            return [currentX - steps, currentY + steps];          
    }
}

