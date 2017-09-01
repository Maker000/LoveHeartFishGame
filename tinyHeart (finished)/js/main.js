var  can1,can2 ,context1,context2;
var canWidth,canHeight;//canvas宽高
var lastTime,deltaTime;//时间间隔
var bgPic = new Image(); //背景图
var ane;
var fruit;
var mom;
var baby;
var mx;//获取鼠标位置
var my;//获取鼠标位置
var data;
var wave;
var dust;
window.onload=function game(){
	init();//初始化
	lastTime = Date.now();//上一次时间
	deltaTime = 0;//时间间隔
	gameloop();
}

/*初始化
 * canvas1在前，绘制小鱼，食物，分数，吃到食物后的圈特效，game over
 * canvas2在后，绘制背景，海葵，背景漂浮物，食物
 */
function init(){
	can1 = document.getElementById("canvas1");  //获得画布1
	can2 = document.getElementById("canvas2");  //获得画布2
	if(can1.getContext){
		context1 = can1.getContext("2d");  //获取画笔1
		context2 = can1.getContext("2d");  //获取画笔2
		canWidth = can1.width;
		canHeight = can1.height;
		can2.addEventListener('mousemove',onMouseMove);//画布1获取鼠标移动事件
		bgPic.src = "src/background.jpg";//获取背景图路径
		ane = new aneObj();
		ane.init();//海葵初始化
		fruit = new fruitObj();
		fruit.init();
		mom = new momObj();
		mom.init();//鱼妈妈初始化
		baby = new babyObj();
		baby.init();
		mx = canWidth*0.5;
		my = canHeight*0.5;
		data = new dataObj();
		dust = new dustObj();
		dust.init();
		wave = new waveObj();
		wave.init();
		context1.font = "20px Verdana";
	//	context1.textAlign = "center";
	}else{
		alert('你的浏览器不支持canvas!');
        return;
	}
}

function gameloop(){
	window.requestAnimFrame(gameloop);//setInterval,setTimeout，和他们比更科学，当前绘制完成后根据机器的性能确定间隔多长时间绘制下一帧
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime>40) deltaTime=40;
	drawBackground();//绘制背景图
	ane.draw();//绘制海葵
	fruitMonitor();//检测食物状态
	fruit.draw();//根据状态绘制食物
	mom.draw();
	baby.draw();
	data.draw();
	dust.draw();
	wave.draw();
	fruitFishCollision();
	momBabyCollision();
}
/*
 * 鼠标移动事件兼容处理,获取鼠标移动时的位置
 */
function onMouseMove(e){
	if(e.offSetX || e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
		
}
