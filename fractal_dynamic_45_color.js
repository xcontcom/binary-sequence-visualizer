let sizexy=512;
let timerId = null;
let timerK = 0;
let size = 1; // Default size multiplier
let kmax = sizexy; // Default kmax (max phase)
let isAnimating = false; // Flag to track animation state
let speed=10; // Speed of animation
let discretization=1; // MouseX/MouseY
let sqrt=2;
let sequence=[];
let min = Infinity, max = -Infinity;

function start() {
	if (!timerId) {
		timerId = setInterval(drawSliceDynamic, speed);
		isAnimating = true; // Update flag
	}
}

function stop() {
	if (timerId) {
		clearInterval(timerId);
		timerId = null;
		isAnimating = false; // Update flag
	}
	timerK = 0;
}

function drawSliceDynamic() {
	if (timerK >= kmax) timerK = 0;
	
	drawSlice(document.getElementById('myCanvas'));
	
	timerK++;
}

function drawSlice(canvas) {
	const context = canvas.getContext('2d');
	canvas.width = sizexy * size;
	canvas.height = sizexy * size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(255,255,255)';
	
	for (let x = 0; x < sizexy; x++) {
		for (let y = 0; y < sizexy; y++) {
			let val = sequence[x] + sequence[y] - min;

			if(val%4==timerK%4 || val%5==timerK%5){
				let hue = ((val + timerK) * 360 / kmax) % 360;
				context.fillStyle = `hsl(${hue}, 100%, 50%)`;
			}else{
				context.fillStyle = 'rgb(0,0,0)';
			}
			
				context.fillRect(x * size, y * size, size, size);

		}
	}
}

function droveLines(ax, ay){
	let hello=document.getElementById('console-log0');
	sqrt=document.getElementById('sqrt').value*1;
	quadratic=document.getElementById('quadratic').checked*1;
	//console.log(quadratic);
	
	ax=Math.floor(ax);
	ay=Math.floor(ay);
	//ay=sizexy;
	discretization=ax/ay;
	
	hello.innerHTML="MouseX: "+ax+", MouseY: "+ay;
	
	sequence=[0]
	for (var i=1;i<sizexy;i++){
		const ii=quadratic ? i*i : i;
		sequence[i]=sequence[i-1]+(Math.floor(ii*discretization*Math.sqrt(sqrt))%2*2-1);
	}

	// Calculate min/max of (sequence[x] + sequence[y])
	min = Infinity;
	max = -Infinity;
	for (let x = 0; x < sizexy; x++) {
		for (let y = 0; y < sizexy; y++) {
			const val = sequence[x] + sequence[y];
			if (val < min) min = val;
			if (val > max) max = val;
		}
	}
	kmax=max-min;
	
	hello.innerHTML+=", kmax: "+kmax;
	
	timerK=Math.floor(kmax/2);
	
	drawSliceDynamic();
}



function getMousePos(canvas, evt){
	let obj=canvas;
	let top=0;
	let left=0;
	while (obj && obj.tagName != 'BODY') {
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
 
	let mouseX=evt.clientX-left+window.pageXOffset;
	let mouseY=evt.clientY-top+window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}

window.onload=function(){
let canvas=document.getElementById('myCanvas');
let context=canvas.getContext('2d');
canvas.width=sizexy*size;
canvas.height=sizexy*size;
context.fillStyle = 'rgb(255,255,255)';
context.fillRect(0, 0, canvas.width, canvas.height);
canvas.addEventListener('mousemove', function(evt){
		let mousePos=getMousePos(canvas, evt);
		droveLines(mousePos.x, mousePos.y);
	}, false);
canvas.addEventListener('click', function() {
	if (isAnimating) {
		stop();
	} else {
		start();
	}
}, false);
};





























