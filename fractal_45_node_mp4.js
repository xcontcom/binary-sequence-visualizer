const { createCanvas } = require('canvas');
const fs = require('fs');
const { spawn } = require('child_process');

let sizexy=512;
let sizex=sizexy;
let sizey=sizexy;
let size = 1;
let quadratic=1;
let a1=330;
let a2=512;
let discretization=a1/a2; // MouseX/MouseY
let sqrt=1;

let sequence=[0]
for (var i=1;i<sizexy;i++){
	const ii=quadratic ? i*i : i;
	sequence[i]=sequence[i-1]+(Math.floor(ii*discretization*Math.sqrt(sqrt))%2*2-1);
}

// Calculate min/max of (sequence[x] + sequence[y])
let min = Infinity;
let max = -Infinity;
for (let x = 0; x < sizexy; x++) {
	for (let y = 0; y < sizexy; y++) {
		const val = sequence[x] + sequence[y];
		if (val < min) min = val;
		if (val > max) max = val;
	}
}
let kmax=max-min;

const canvas = createCanvas(sizex * size, sizey * size);
const ctx = canvas.getContext('2d');

// Setup FFmpeg process
const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'image2pipe',
  '-vcodec', 'png',
  '-r', '30',
  '-i', 'pipe:0',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'slow',
  '-crf', '20',
  `fractal_${quadratic}_${a1}_${a2}.mp4`
]);

//for (let i = 0; i <= 20; i++) {
for (let i = 0; i <kmax; i++) {
	
	ctx.fillStyle = 'rgb(0,0,0)'
	ctx.fillRect(0, 0, sizex * size, sizey * size);
	ctx.fillStyle = 'rgb(255,255,255)';
	
	for(var x=0;x<sizex;x++){
		for(var y=0;y<sizey;y++){
			
			
			let val = sequence[x] + sequence[y] - min;
			//if(val%4==i%4){
			if(val%4==i%4 || val%5==i%5){
				let hue = ((val + i) * 360 / kmax) % 360;
				ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
			}else{
				ctx.fillStyle = 'rgb(0,0,0)';
			}
			ctx.fillRect(x * size, y * size, size, size);

		}
	}

	const frame = canvas.toBuffer('image/png');
	ffmpeg.stdin.write(frame);
}
ffmpeg.stdin.end();

