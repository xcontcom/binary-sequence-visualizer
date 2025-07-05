const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

let sizexy=512;
let sizex=sizexy;
let sizey=sizexy;
let size = 1;
let quadratic=1;
let a1=130;
let a2=493;
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

const encoder = new GIFEncoder(sizex * size, sizey * size);
encoder.createReadStream().pipe(fs.createWriteStream(`fractal_${a1}_${a2}_${quadratic}.gif`));

encoder.start();
encoder.setRepeat(0); // 0 = loop forever
encoder.setDelay(100); // frame delay in ms
encoder.setQuality(10);

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

	// Add frame to GIF
	encoder.addFrame(ctx);
}
encoder.finish();
console.log('GIF saved');

