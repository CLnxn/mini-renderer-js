import { Object3D } from "./object3D.js";
import { subtractVectors, dotProduct } from "./utils.js";
export class LightSource{

    constructor(x,y,z){
        this.position = [x,y,z];
        this.rays = {}
    }
    /**
     * 
     * @param {Object3D} obj3D 
     */
    castRays(obj3D){
        let ptsData = obj3D.getPointsData();
        
        this.rays[obj3D.tag] = [];
        Array.prototype.push.call(this.rays[obj3D.tag], ...ptsData.map((val,i)=>[subtractVectors(val[0],this.position),ptsData[i][1]]));
        // console.debug("after casting Ray for obj3D with tag:",obj3D.tag,this.rays[obj3D.tag]);
    }
    clearRays(){
        this.rays = {}
    }
    /**
     * 
     * @param {Object3D} obj3D 
     * @returns a luminosity array of a renderobject if ray data for the object's tag is present in this.rays. luminosity ranges from 0 to 1
     */
    getLuminosities(obj3D){
        if (Object.prototype.hasOwnProperty.call(this.rays,obj3D.tag)){
            return Array.prototype.map.call(this.rays[obj3D.tag], ray=> (dotProduct(ray[0],ray[1], true)+1)/2.0);
        }
        return undefined;
    }
    getPosition(){
        return this.position;
    }

}