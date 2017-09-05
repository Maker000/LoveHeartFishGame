/*
 * 鱼妈妈
 */
var momObj = function(){
	this.x;
	this.y;
	this.angle;
	//大鱼尾巴序列帧操作
	this.bigTailCount = 0;
	this.bigTailTimer = 0;
	//大鱼眼睛序列帧
	this.bigEyesCount = 0;
	this.bigEyesTimer = 0;
	this.bigEyesInterval = 1000;
	//大鱼身体变化
	this.bigBodyCount = 0;
	
	this.bigEyes = [];
	this.bigBodyOrg = [];
	this.bigBodyBlue = [];
	this.bigTail =[];
}

/*
 * 初始化大鱼
 */
momObj.prototype.init = function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle = 0;
	//初始化尾巴序列帧
	for(var i = 0; i < 8; i++){
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "src/bigTail"+i+".png";
	}
	//初始化眼睛序列帧
	for(var i = 0; i < 2; i++){
		this.bigEyes[i] = new Image();
		this.bigEyes[i].src = "src/bigEye"+i+".png";
	}
	//初始化身体
	for(var i = 0; i < 8; i++){
		this.bigBodyOrg[i] = new Image();
		this.bigBodyOrg[i].src = "src/bigSwim"+i+".png";
		this.bigBodyBlue[i] = new Image();
		this.bigBodyBlue[i].src = "src/bigSwimBlue"+i+".png";
	}
}
/*
 * 绘制大鱼
 */
momObj.prototype.draw = function(){
	//鱼随鼠标移动
	this.x = lerpDistance(mx,this.x,0.945);//使用了com里面的封装好的方法，后面的趋近前面的，mx是变化的
	this.y = lerpDistance(my,this.y,0.945);
	//鱼随鼠标旋转
	var deltaY = my - this.y;//鼠标和鱼的纵坐标差
	var deltaX = mx - this.x;//鼠标和鱼的横坐标差
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//[-PI,PI]反正切获取角度，注意y在前面，使鱼的角度趋近于这个角度
	this.angle = lerpAngle(beta,this.angle,0.4);//返回趋近角度
	//大鱼摇尾巴
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer >50){
		this.bigTailCount = (this.bigTailCount+1)%8;//使值不超过8,实现了循环
		this.bigTailTimer %= 50;//使值初始化
	}
	//大鱼眨眼睛
	this.bigEyesTimer += deltaTime;
	if(this.bigEyesTimer >this.bigEyesInterval){
		this.bigEyesCount = (this.bigEyesCount+1)%2;//转到下一帧
		this.bigEyesTimer %= this.bigEyesInterval;//初始化
		if(this.bigEyesCount == 0){
			this.bigEyesInterval = Math.random()*1500+2000;
		}else{
			this.bigEyesInterval = 200;
		}
	}
	
	context1.save();
	context1.translate(this.x,this.y);
	context1.rotate(this.angle);
	context1.drawImage(this.bigTail[this.bigTailCount],-this.bigTail[this.bigTailCount].width *0.5+30, -this.bigTail[this.bigTailCount].height*0.5);
	if(data.double == 1){//当吃到橙色的果实时身体变化
		context1.drawImage(this.bigBodyOrg[this.bigBodyCount],-this.bigBodyOrg[this.bigBodyCount].width *0.5, -this.bigBodyOrg[this.bigBodyCount].height*0.5);
	}else{//吃到蓝色的果实时身体变化
		context1.drawImage(this.bigBodyBlue[this.bigBodyCount],-this.bigBodyBlue[this.bigBodyCount].width *0.5, -this.bigBodyBlue[this.bigBodyCount].height*0.5);
	}
	context1.drawImage(this.bigEyes[this.bigEyesCount], -this.bigEyes[this.bigEyesCount].width * 0.5,  -this.bigEyes[this.bigEyesCount].height * 0.5);
	context1.restore();
}
	
