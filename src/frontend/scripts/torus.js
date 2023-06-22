import { Object3D } from "./object3D.js";
import { addVectors } from "./utils.js";


export class Torus extends Object3D {


    constructor(center = [0,0,20],lengths = [4,5], tag = 'torus'){
        super(center, 0, tag);
        this.l1 = lengths[0];
        this.l2 = lengths[1];
        
    }


    shape_fn(t, v, n_derivative=0){
        switch(n_derivative){
            case 0:
                return addVectors([(this.l1*Math.cos(t)+this.l2)*Math.cos(v),(this.l1*Math.cos(t)+this.l2)*Math.sin(v),this.l1*Math.sin(t)],this.center);

            case 1:
                let a,b,c;
                [a,b,c] = addVectors([this.length*Math.cos(t),this.length*Math.sin(t),0], this.center);
                return [-a,b,c];
            case 2:
                return addVectors([this.l1*Math.cos(t),this.l1*Math.sin(t),0], this.center).map(x=>-x);

            default:
                return undefined;
            }
    }
    loadPointsData(n){
        let n1,n2;
        n1 =n2 = Math.floor(Math.sqrt(n));
        let pointsData = Array(n1*n2);
        
        for(let i = 0; i < n1; i++){
            let u = ((i+1.0)/n1)*2*Math.PI;
            for(let j = 0; j < n2; j++){
                let v = ((j+1.0)/n2)*2*Math.PI;
                let surface_vect = this.getSurfaceVectAt(v,u);
                let point3D = this.shape_fn(v,u);
                if (!point3D){
                    console.error("point3D is undefined in loadPointsData in torus")
                }
                pointsData[i*(n2)+j] = [point3D, surface_vect];

            }
        }
        this.loadedPointsData = pointsData
        // console.debug("after loadPointsData:",this.loadedPointsData);
        
    }
    
}