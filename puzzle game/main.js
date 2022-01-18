let parts = document.querySelectorAll(".part");
let gap = 10;
let selected = false;
let initX,initY,gapX,gapY;
let half = 50;

function generateGame(base,x,y){
    for(let i = 0 ; i< x*y ; i++){
        base.appendChild(document.createElement("div"));
    }
}

parts[0].row = parts[1].row = parts[2].row = 0;
parts[3].row = parts[4].row = parts[5].row = 1;
parts[6].row = parts[7].row = parts[8].row = 2;
parts[0].column = parts[3].column = parts[6].column = 0;    
parts[1].column = parts[4].column = parts[7].column = 1;
parts[2].column = parts[5].column = parts[8].column = 2;

function handleMouseDown(e){
    initX = e.clientX;
    initY = e.clientY;
    selected = true;
    console.log(initX, initY);
}

function handleMouseMove(e){
    if (selected) {
    e.target.style.left = initX + (e.clientX - initX) - half + "px";
    e.target.style.top = initY + (e.clientY - initY) - half + "px";
}}

function handleMouseUp(e){
    if (selected) console.log("mouse up");
    selected = false;
}

parts.forEach((el,index)=>{
    el.style.backgroundPosition = (300 - (el.column * 100)) + "px " + ( 300 -(el.row * 100)) + "px";
    el.POSE = (300 - (el.column * 100)) + "px " + ( 300 -(el.row * 100)) + "px";
    el.addEventListener("mousedown", handleMouseDown );
    el.addEventListener("mousemove", handleMouseMove );
    el.addEventListener("mouseup", handleMouseUp );
    el.addEventListener("mouseleave", handleMouseUp);
    el.style.left = index*100 + gap + "px"; gap+=10;
    el.serial = index;
});

window.onmouseup = () => { selected = false ; }