import { addVectors } from "./utils.js";
// base class for custom render objects to extend from.
export class Object3D {

    constructor(center = [0,0,20],length = 100,tag = 'circle'){
        this.loadedPointsData = [];  // an array of point_vect,normal_vect pairs.
        this.center = center; 
        this.length = length;
        this.tag = tag;
        
    }
    // default characteristic function (shape_fn) for the object. t is in radians
    circle(t, n_derivative=0){
        switch(n_derivative){
            case 0:
                return addVectors([this.length*Math.cos(t),this.length*Math.sin(t),0], this.center);

            case 1:
                let a,b,c;
                [a,b,c] = addVectors([this.length*Math.cos(t),this.length*Math.sin(t),0], this.center);
                return [-a,b,c];
            case 2:
                return addVectors([this.length*Math.cos(t),this.length*Math.sin(t),0], this.center).map(x=>-x);

            default:
                return undefined;
            }
    }
    // this function determines the object's shape.
    shape_fn(t, n_derivative=0){
        return this.circle(t, n_derivative);

    }
    getSurfaceVectAt(t){
        return this.shape_fn(t,2).map(x=>-x);

    }
    translate3D(){

    }
    //yaw, pitch and roll are measured in radians.
    rotatePointOld(pt, yaw, pitch ,roll){
        let x,y,z;
        [x,y,z]= pt
        return [
            x*(Math.cos(yaw)*Math.cos(pitch)+Math.sin(roll)*Math.sin(yaw)*Math.sin(pitch))-y*Math.cos(roll)*Math.sin(yaw),
            x*(Math.cos(pitch)*Math.sin(yaw)-Math.cos(yaw)*Math.sin(roll)*Math.sin(pitch)) + y*(Math.cos(roll)*Math.cos(yaw)),
            x*Math.cos(roll)*Math.sin(pitch) + y*Math.sin(roll)
        ]
    }
    rotatePoint(pt, yaw, pitch ,roll){
        let x,y,z;
        [x,y,z]= pt
        return [
            x*(Math.cos(pitch)*Math.cos(yaw))+y*(Math.cos(yaw)*Math.sin(pitch)*Math.sin(roll)-Math.sin(yaw)*Math.cos(pitch))+z*(Math.cos(yaw)*Math.sin(pitch)*Math.cos(roll)+Math.sin(yaw)*Math.sin(roll)),
            x*(Math.sin(yaw)*Math.cos(pitch))+y*(Math.sin(yaw)*Math.sin(pitch)*Math.sin(roll)+Math.cos(yaw)*Math.cos(roll))+z*(Math.sin(yaw)*Math.sin(pitch)*Math.cos(roll)-Math.cos(yaw)*Math.sin(roll)),
            x*(-Math.sin(pitch))+y*(Math.cos(pitch)*Math.sin(roll)) + z*(Math.cos(pitch)*Math.cos(roll))
        ]
    }
    //yaw, pitch and roll are measured in radians.
    rotate3D(yaw, pitch, roll){
        for(let i =0; i < this.loadedPointsData.length; i++){
            let ptData = this.loadedPointsData[i];
            let rotatedPt = this.rotatePoint(ptData[0], yaw, pitch, roll);
            let rotateNorm = this.rotatePoint(ptData[1], yaw, pitch, roll);
            this.loadedPointsData[i] = [rotatedPt, rotateNorm];
        }
    }
    // loads n points data. Overrides old pointsdata if called again
    loadPointsData(n){
        let pointsData = Array(n)
        for(let i = 0; i < n; i++){
            let t = ((i+1.0)/n)*2*Math.PI;
            let surface_vect = this.getSurfaceVectAt(t);
            let point3D = this.shape_fn(t);
            pointsData[i] = [point3D, surface_vect];
        }
        this.loadedPointsData = pointsData
        // console.debug("after loadPointsData:",this.loadedPointsData);
        
    }
    // to be overidden by child classes
    getPointsData(){
        return this.loadedPointsData
    }




}

// let obj  = new Object3D([5,0,0])