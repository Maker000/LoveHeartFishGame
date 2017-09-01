var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	//小鱼眼睛眨
	this.babyEyesTimer = 0;
	this.babyEyesCount = 0;
	this.babyEyesInterval = 1000;
	//小鱼身体渐变
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
	//小鱼尾巴变化
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyes = [];
	this.babyBody = [];
	this.babyTail = [];
}

babyObj.prototype.init = function(){
	this.angle = 0;
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	//初始化眼睛序列帧
	for(var i = 0; i<2; i++){
		this.babyEyes[i] = new Image();
		this.babyEyes[i].src = "src/babyEye"+i+".png";
	}
	//初始化身体序列帧
	for(var i = 0; i<20; i++){
		this.babyBody[i] = new Image();
		this.babyBody[i].src = "src/babyFade"+i+".png";
	}
	//初始化尾巴序列帧
	for(var i = 0; i<8; i++){
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "src/babyTail"+i+".png";
	}
}
/*
 * 小鱼绘制
 */
babyObj.prototype.draw = function(){
	if(!data.gameOver){
		//小鱼趋向大鱼
		this.x = lerpDistance(mom.x,this.x,0.98);
		this.y = lerpDistance(mom.y,this.y,0.98);
		//小鱼随大鱼旋转
		var deltaY = mom.y - this.y;//大鱼和小鱼的纵坐标差
		var deltaX = mom.x - this.x;//大鱼和小鱼的横坐标差
		var beta = Math.atan2(deltaY,deltaX)+Math.PI;//[-PI,PI]反正切获取角度，注意y在前面，使鱼的角度趋近于这个角度
		this.angle = lerpAngle(beta,this.angle,0.7);//返回趋近角度
		//小鱼摇尾巴
		this.babyTailTimer += deltaTime;
		if(this.babyTailTimer>50){
			this.babyTailCount = (this.babyTailCount +1) % 8;
			this.babyTailTimer %= 50; 
		}
	}
	
	
	//小鱼眨眼睛
	this.babyEyesTimer += deltaTime;
	if(this.babyEyesTimer >this.babyEyesInterval ){
		this.babyEyesCount = (this.babyEyesCount+1)%2;//使值不超过2，循环
		this.babyEyesTimer %= this.babyEyesInterval;//使值初始化变小
		if(this.babyEyesCount==0){//睁眼状态
			this.babyEyesInterval = Math.random()*1500+2000;
		}else{
			this.babyEyesInterval = 200;
		}
	}
	//小鱼身体渐变
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer >300){
		this.babyBodyCount = this.babyBodyCount+1;//变到下一帧
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount >19){
			this.babyBodyCount =19;//完全变白，游戏结束
			data.gameOver = true;
		}
	}
	
	context1.save();
	context1.translate(this.x,this.y);
	context1.rotate(this.angle);
	context1.drawImage(this.babyTail[this.babyTailCount],-this.babyTail[this.babyTailCount].width*0.5+25,-this.babyTail[this.babyTailCount].height*0.5);
	context1.drawImage(this.babyBody[this.babyBodyCount], -this.babyBody[this.babyBodyCount].width*0.5, -this.babyBody[this.babyBodyCount].height*0.5);
	context1.drawImage(this.babyEyes[this.babyEyesCount], -this.babyEyes[this.babyEyesCount].width*0.5, -this.babyEyes[this.babyEyesCount].height*0.5);
	
	context1.restore();
}
