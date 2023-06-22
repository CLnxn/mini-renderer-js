import { Projector } from "./projector.js";


export function getCanvas(){
    let canvas = document.getElementById('cvjs')

    return canvas;
}

const projector = new Projector();
const canvasHTML = getCanvas();

projector.setCanvasScreen(canvasHTML);
projector.getViewer().setCanvasPixelRatio(0.25,0.25);
projector.start();

let t = undefined
let stop_btn = document.getElementById("stop");
let play_btn = document.getElementById("play");
play_btn.onclick = renderPlay;
stop_btn.onclick = renderPause;

renderPlay();


function renderPlay(){
    if (!t)
    t = setInterval(()=>{
        projector.update();
    },10);
    
}
// setTimeout(()=>{
//     projector.update();
// },500);

export function renderPause(){
    clearInterval(t);
    t = undefined;
}