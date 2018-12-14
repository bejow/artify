import {rainbowColors, warmColors, coldColors, mountainColors} from './colors';

export function getRandomInt(min, max) {
    //returns a random int between (inclusive) min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isPositionOnCanvas(position, canvasWidth, canvasHeight, padding){
    if(position[0] >= 0+padding && position[0] <= canvasWidth - padding){
        //x is on the canvas
        if(position[1] >= 0+padding && position[1] <= canvasHeight - padding){
            //y is also on canvas
            return true;
        }
    }
    return false;
}

export function mapTo(value, fromMin, fromMax, toMin, toMax){
    return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin
}

export function parseValueToColors(value){
    if (value > 0.85){
        return rainbowColors;
    }
    if (value > 0.6){
        return mountainColors;
    }
    return coldColors
}

export function parseValueToSteprange(value){
    if (value < 90){
        return [8,20];
    }
    if (value < 130){
        return [4,10];
    }
    return [1,5];
}

export function positionAfterStep(currentX, currentY, direction, steps){
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

