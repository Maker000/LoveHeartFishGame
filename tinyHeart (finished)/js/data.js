var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;//吃到蓝色果实分数加倍
	this.score = 0;
	this.n = 0;
	this.gameOver = false;
	this.alpha = 0;
}
//分值绘制
dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;
	context1.save();
	context1.fillStyle = "white";
	context1.shadowBlur = 10;
	context1.shadowColor = "white";
	context1.fillText("SCORE：" + this.score, w * 0.5-55, 45);
	context1.font = "15px Verdana";
	context1.fillText("fruitNum：" + this.fruitNum * 100 , 40, 30);
	context1.fillText("double：" + this.double , 40, 60);
	if(this.gameOver){
		this.alpha += deltaTime * 0.0007;//deltaTime和存在的位置无关，根据时间和而运行，获取到的变量条件判断来处理
		if(this.alpha >1){
			//使Game Over闪动三次
			if(this.n<2){
				while(this.alpha>0.4){//跳出循环deltaTime继续影响this.alpha的值
					this.alpha -= 0.000001;
				}
				this.n++;
			}else{
				this.alpha = 1;
			}
		}
		context1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
		context1.font = "25px Verdana";
		context1.textAlign = "center";
		context1.fillText("Game Over！", w * 0.5, h * 0.5-50);
	}
	context1.restore();
}
//分值累加
dataObj.prototype.addScore = function(){
	this.score +=this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}
