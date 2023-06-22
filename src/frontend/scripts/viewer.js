

import {Canvas} from './canvas.js'



export class Viewer{
    constructor(x,y,z){
        this.canvas = undefined;
        this.position = [x,y,z];
        this.field_of_view = 1500; //5 units infront (+ve z direction) from the position of viewer
    }
    setCanvas(canvasHTML){
        this.canvas = new Canvas(canvasHTML);
    }
    setCanvasPixelRatio(w_ratio,h_ratio){
        this.canvas.setPixelSize(w_ratio,h_ratio);
    }

    getCanvas(){
        return this.canvas;
    }
    //changes the origin point of 2D coordinates from the centre of the canvas to the top left. 
    normalisePoint(point2D){
        let width = this.canvas.width;
        let height = this.canvas.height;
        let x_norm = width/2.0 + point2D[0];
        let y_norm = height/2.0 - point2D[1];
        return [x_norm, y_norm];
    }

}