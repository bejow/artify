export default function sketch(p5, id="canvas"){
  let mouseX = 10;
  let canvasHeight = 200;
  let canvasWidth = 200;
  var currentX = 200;
  var currentY = 50;

  p5.setup = function () {
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.frameRate(60);
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = function(props){
    console.log(props);
    mouseX = props.mouseX;
    canvasHeight = props.canvasHeight;
    canvasWidth = props.canvasWidth;
  }

  p5.draw = function () {
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
    //white dot from the right to the left
    p5.background(0);
    currentX = currentX - 5;
    if (currentX <= 40){
      currentX=p5.width - 40;
    }
    p5.ellipse(currentX, currentY, 80, 80)
  }

}