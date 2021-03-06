function thermometerinterMain() {
	this.version = '0.88';
	w = 490;
	h = 490;
	sliderTp = 65;
	sliderLt = 20;
	sliderHt = 430;
	sliderMin = -40;
	sliderMax = 105;
	var s = '';
	s += '<div style="position:relative; width:' + w + 'px; height:' + h + 'px; border: none;  margin:auto; display:block;">';
	s += '<canvas id="canvasId" width="' + w + '" height="' + h + '" style="z-index:1;"></canvas>';
	s += '<div style="position:absolute; top:15px; left:28px; font-size: 16pt; color: #6666ff; text-align:center;">&deg;C</div>';
	s += '<div style="font-size: 16pt; color: #00aa00; position:absolute; top:15px; left:120px; text-align:center;">&deg;F</div>';
	s += '<input type="range" id="r1"  value="0" min="' + sliderMin + '" max="' + sliderMax + '" step="1" style="z-index:2; position:absolute; top:262px; left:-135px; width:' + sliderHt + 'px; height:17px; border: none; transform: rotate(270deg); margin-left: 10px;" oninput="updateTemp(0,0)" onchange="updateTemp(0,0)" />';
	var degs = [['C', '#6666ff', 200], ['F', '#00aa00', 360]];
	for (var i = 0; i < 2; i++) {
		s += '<div style="position:absolute; left:' + degs[i][2] + 'px; top:70px; border:  1px solid black; padding:2px; background-color:' + degs[i][1] + ';">';
		s += '<span id="deg' + degs[i][0] + '" style="display: inline-block; padding: 2px 6px 2px 0px; width:70px; height:28px; background-color: black; color: white; font: bold italic 23px Arial; text-align: right;">28.5</span>';
		s += '<span style="display: inline-block; padding: 2px 6px 2px 5px; color: white; font: bold 24px Arial;">&deg;' + degs[i][0] + '</span>';
		s += '</div>';
	}
	s += '<div style="position:absolute; left:190px; top:130px; width:300px; text-align: center;">';
	s += '<img id="img" src="images/boil.jpg" style="" />';
	s += '</div>';
	s += '<div id="descr" style="position:absolute; left:190px; width:300px; font: bold italic 25px Arial; color:black;  text-align: center;"></div>';
	s += '<div id="copyrt" style="position:absolute; right:3px; bottom:3px; font: 10px Arial; font-weight: bold; color: blue; ">&copy; 2015 MathsIsFun.com  v' + this.version + '</div>';
	s += '</div>';
	document.write(s);
	el = document.getElementById('canvasId');
	ratio = 1.5;
	el.width = w * ratio;
	el.height = h * ratio;
	el.style.width = w + "px";
	el.style.height = h + "px";
	g = el.getContext("2d");
	g.setTransform(ratio, 0, 0, ratio, 0, 0);
	drawTherm();
	imgs = ["", "blizzard.jpg", "snow.jpg", "ice.jpg", "rainy.jpg", "sunny.jpg", "beach.jpg", "desert.jpg", "coffee.jpg", "boil.jpg", ""];
	preloadImages(imgs);
	updateTemp();
	window.addEventListener("keydown", onKey, false);
}
function onKey( ev ) {
	var keyCode = ev.keyCode;
	if (keyCode == 38 || keyCode == 40) { 
		ev.preventDefault();
		var div = document.getElementById("r1");
		var c = div.value;
		if (keyCode == 38) c++;
		if (keyCode == 40) c--;
		c = Math.max(-40, Math.min(c, 105));
		div.value = c;
		updateTemp();
	}
}
function drawTherm() {
	g.strokeStyle = "#8888ff";
	g.fillStyle = "#6666ff";
	g.font = "bold 14px Verdana";
	g.textAlign = "right";
	for (var i = sliderMin; i <= sliderMax; i++) {
		var xP = 80;
		var yP = cToY(i);
		var tickLen = 5;
		if (i % 5 == 0) tickLen = 10;
		if (i % 10 == 0) tickLen = 20;
		g.beginPath();
		g.moveTo(xP, yP);
		g.lineTo(xP - tickLen, yP);
		g.stroke();
		if (i % 10 == 0) {
			g.fillText(i, xP - 22, yP)
		}
	}
	g.strokeStyle = "#00aa00";
	g.fillStyle = "#00aa00";
	var fMin = -40;
	var fMax = sliderMax * 9 / 5 + 32;
	for (i = fMin; i <= fMax; i += 2) {
		xP = 100;
		var c = (i - 32) * 5 / 9;
		yP = cToY(c);
		tickLen = 5;
		if (i % 10 == 0) tickLen = 20;
		g.beginPath();
		g.moveTo(xP, yP);
		g.lineTo(xP + tickLen, yP);
		g.stroke();
		if (i % 10 == 0) {
			g.fillText(i, xP + 52, yP);
		}
	}
}
function updateTemp( deg, degType ) {
	deg = Number(deg);
	var sliderEl = document.getElementById("r1");
	var sliderVal = 0;
	var f = 0;
	switch ( degType ) {
		case "C":
			sliderVal = deg;
			f = (sliderVal * 1.8 + 32);
			f = Number(f.toPrecision(5)).toString();
			break;
		case "F":
			sliderVal = (deg - 32 ) * 5 / 9;
			sliderVal = Number(sliderVal.toPrecision(7)).toString();
			f = deg;
			break;
		default:
			sliderVal = Number(sliderEl.value);
			f = (sliderVal * 1.8 + 32);
			f = Number(f.toPrecision(5)).toString();
	}
	sliderEl.value = sliderVal;
	document.getElementById('degC').innerHTML = sliderVal.toString();
	document.getElementById('degF').innerHTML = f.toString();
	g.clearRect(80, 0, 20, h);
	g.fillStyle = "#ff6666";
	var ypos = cToY(sliderVal);
	g.beginPath();
	g.rect(80, ypos, 20, h - ypos);
	g.fill();
	if (degType == 0) {
		if (typeof pageTempChg === "function") {
			pageTempChg(sliderVal, f);
		}
	}
	doUpdate(sliderVal);
}
function cToY( c ) {
	return parseInt((sliderMax - c) * ((sliderHt - 15) / (sliderMax - sliderMin))) + sliderTp;
}
function doUpdate( C ) {
	var texts = ["<", "Very Cold !", "Fun in the Snow", "Ice", "Cool Day", "Nice Sunny Day", "Fun at the Beach", "Hot Desert", "Hot Coffee", "Boiling Water", ">"];
	var txtHts = [200, 200, 290, 195, 200, 250, 240, 240, 210, 240, 200];
	var clrs = ['#000000', '#0099FF', '#FF66FF', '#FFFFFF', '#aaaaaa', '#C6DF7B', '#FFFF00', '#EFB67B', '#B58E4A', '#FF0000', '#000000'];
	var imgNo = 0;
	if (C < -20) {
		imgNo = 1;
	} else if (C < -3) {
		imgNo = 2;
	} else if (C < 1) {
		imgNo = 3;
	} else if (C < 18) {
		imgNo = 4;
	} else if (C < 30) {
		imgNo = 5;
	} else if (C < 38) {
		imgNo = 6;
	} else if (C < 58) {
		imgNo = 7;
	} else if (C < 100) {
		imgNo = 8;
	} else if (C < 111) {
		imgNo = 9;
	} else {
		imgNo = 10;
	}
	document.getElementById('img').src = 'images/' + imgs[imgNo];
	document.getElementById('descr').innerHTML = texts[imgNo];
	document.getElementById('descr').style.top = (txtHts[imgNo] + 50) + 'px';
	document.getElementById('descr').style.color = clrs[imgNo];
}
function preloadImages( imgs ) {
	for (var i = 1; i < imgs.length - 1; i++) {
		preloadImage('images/' + imgs[i]);
	}
}
function preloadImage( url ) {
	var img = new Image();
	img.src = url;
}