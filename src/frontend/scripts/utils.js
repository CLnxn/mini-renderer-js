

/**
 * 
 * @param {Array} v1 
 * @param {Array} v2 
 * @returns {Array} resultant vector
 */
export function addVectors(v1, v2){
    return Array.prototype.map.call(v1,(val,i)=>v2[i]+val);
}
export function subtractVectors(v1, v2){
    return Array.prototype.map.call(v1, (val,i)=>val-v2[i]);
}

export function dotProduct(v1,v2, normalised = false){
    if(!normalised){
        return Array.prototype.reduce.call(v1, (p,x,i)=>p+x*v2[i]);
    }
    let a,b;
    a = b = 0;
    Array.prototype.forEach.call(v1,(x,i)=>{
        a = a + Math.pow(x,2);
        b = b + Math.pow(v2[i],2);
    });
    return Array.prototype.reduce.call(v1, (p,x,i)=>p+x*v2[i])/Math.sqrt(a*b);
}