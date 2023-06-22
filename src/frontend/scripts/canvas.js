import { Brush } from "./brush.js";





export class Canvas{

    /**
     * 
     * @param {HTMLCanvasElement} canvasHTML 
     */
    constructor(canvasHTML){
        this.canvas = canvasHTML;
        this.width = canvasHTML.width;
        this.height = canvasHTML.height;
    }
    /**
     * 
     * @param {number} pixel_width_ratio determines the width of a pixel as a proportion of canvas width.
     * @param {number} pixel_height_ratio determines the height of a pixel as a proportion of canvas height.
     */
    setPixelSize(pixel_width_ratio, pixel_height_ratio){
        this.pixel_height_ratio = pixel_height_ratio;
        this.pixel_width_ratio = pixel_width_ratio;
        this.pixel_width = this.width*pixel_width_ratio;
        this.pixel_height = this.height*pixel_height_ratio;
    }
    /**
     * 
     * @param {Brush} brush
     */
    render(brush, clear=true){
        
        const ctx = this.canvas.getContext("2d");
        if (clear) ctx.clearRect(0,0,this.width, this.height);
        brush.setDrawingContext(ctx);
        brush.setStrokeSize(this.pixel_width, this.pixel_height);
        brush.startDrawing();
        
    }
    clearCanvas(){
        this.canvas.getContext("2d").clearRect(0,0,this.width, this.height);
    }

}

