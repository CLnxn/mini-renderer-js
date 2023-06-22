import { LightSource } from "./lightsource.js";
import { Object3D } from "./object3D.js";
import { Viewer } from "./viewer.js";
import { CharacterBrush } from "./brush.js";
import { Torus } from "./torus.js";
export class Projector{
    
    constructor(){
        this.lightsource = new LightSource(0,20,-10);
        // this.object3d = new Object3D([0,0,110], 100);
        this.object3d = new Torus([0,0,110]);
        this.viewer = new Viewer(0,0,-10);
        
    }

    setCanvasScreen(canvasHTML){
        this.viewer.setCanvas(canvasHTML);
    }
    getViewer(){
        return this.viewer;
    }
    start(){
        this.object3d.loadPointsData(1000);
        this.lightsource.castRays(this.object3d);
        let luminosities = this.lightsource.getLuminosities(this.object3d);
        // console.debug("luminosities",luminosities);

        let pointsData = this.object3d.getPointsData();
        if (luminosities.length !== pointsData.length){
            console.error("luminosity size not the same as number of surface points on object", pointsData, 'vs',luminosities);
            return;
        }
        // can be made async
        let luminatedPoints2D = pointsData.map((ptData,i)=>[this.get2DProjection(ptData[0]), luminosities[i]]);
        
        this.brush = new CharacterBrush();
        this.brush.create(['@','#','$','%']);
        this.brush.loadLuminosityData(luminatedPoints2D);
        this.viewer.getCanvas().render(this.brush);
    }

    update(){
        this.object3d.rotate3D(-0.05,0.05,0.02);
        this.lightsource.castRays(this.object3d);
        let luminosities = this.lightsource.getLuminosities(this.object3d);
        // console.debug("luminosities",luminosities);

        let pointsData = this.object3d.getPointsData();
        if (luminosities.length !== pointsData.length){
            console.error("luminosity size not the same as number of surface points on object");
            return;
        }
        // can be made async
        let luminatedPoints2D = pointsData.map((ptData,i)=>[this.get2DProjection(ptData[0]), luminosities[i]]);
        
        this.brush.loadLuminosityData(luminatedPoints2D);
        this.viewer.getCanvas().render(this.brush);
    }
    

    get2DProjection(point3D){
        let x,y,z;
        [x,y,z] = point3D;
        let proj_ratio = this.viewer.field_of_view/(z-this.viewer.position[2]);
        let x_p = proj_ratio*x;
        let y_p = proj_ratio*y; 
        return this.viewer.normalisePoint([x_p, y_p]);        
    }


}