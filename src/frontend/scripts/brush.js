

export class Brush {


    constructor(){
        this.min_font_size_px = 5; 
    }
    setMinFontSize(font_size_px){
        this.min_font_size_px = font_size_px;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    setDrawingContext(ctx){
        this.ctx = ctx;
    }
    loadPoints(){

    }
    setStrokeSize(width, height){
        this.width =  width;
        this.height = height;
    }
    startDrawing(){
        for(let i = 0; i < this.charPointPairs; i++){
            let char, pt;  
            [char, pt] = this.charPointPairs[i];
            this.ctx.fillText(char, pt[0], pt[1]);
        }
    }
}

export class CharacterBrush extends Brush {

    
    /**
     * 
     * @param {Array} charset a character array sorted by luminosity from lowest to highest 
     */
    create(charset){
        this.charset = charset;
    }
    getCharacterByLuminosity(raw_luminosity){
        return raw_luminosity == 0?
         this.charset[0] :
          this.charset[Math.ceil((this.charset.length-1)*raw_luminosity)];
    }
    loadLuminosityData(pointLuminosityPairs){
        this.charPointPairs = Array(pointLuminosityPairs.length);
        for(let i =0; i < pointLuminosityPairs.length;i++){
            let char = this.getCharacterByLuminosity(pointLuminosityPairs[i][1]);
            this.charPointPairs[i] = [char, pointLuminosityPairs[i][0]];
        }
    }
    setStrokeSize(width, height){
        super.setStrokeSize(width, height);
        let font_size = Math.max(Math.floor((Math.min(width, height)/16)), this.min_font_size_px).toString();
        let i = String.prototype.indexOf.call(this.ctx.font,'px');
        this.ctx.font =  font_size + this.ctx.font.substring(i);
        // console.debug(this.ctx.font);
    }
    setDrawingContext(ctx){
        super.setDrawingContext(ctx);
        this.ctx.font = ''
    }
    
    startDrawing(){
        // console.debug("startDrawing:",this.charPointPairs);
        
        for(let i = 0; i < this.charPointPairs.length; i++){
            let char, pt;  
            [char, pt] = this.charPointPairs[i];
            this.ctx.fillText(char, pt[0], pt[1]);
            
        }
    }


}