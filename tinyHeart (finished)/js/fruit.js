/*
 * 食物对象
 */
var fruitObj = function(){
	this.alive = [];//状态
	this.x = [];//果实的x位置
	this.y = [];
	this.l = [];//果实变化大小
	this.aneNO = [];
	this.spd = [];//每个果实的速度
	this.fruitType = [];//果实类型
	this.orange = new Image();//橙色果实
	this.blue = new Image();//蓝色果实
	this.num = 18;
}
	//果实初始化
	fruitObj.prototype.init = function(){
		for(var i = 0; i<this.num; i++){
			this.born(i);//果实出生
			this.spd[i] = Math.random() * 0.02+0.002;//产生随机速度
			var run = Math.random();//产生果实类型的随机数
			if(run<0.2){//产生蓝色果实的几率
				this.fruitType[i] = this.blue;
			}else{
				this.fruitType[i] = this.orange;
			}
 		}
		this.orange.src = "src/fruit.png";
		this.blue.src = "src/blue.png";
	}
//果实绘制
fruitObj.prototype.draw = function(){
	for(var i=0; i<this.num; i++){
		if(this.alive[i]){
			if(this.l[i]<=15){//果实成长至成熟
				var aneNO = this.aneNO[i];
				this.x[i] = ane.headx[aneNO];
				this.y[i] = ane.heady[aneNO];
				this.l[i] += this.spd[i] * deltaTime;
			}else{//果实向上漂浮
				this.y[i] -=this.spd[i] * 5* deltaTime;
			}
			context2.drawImage(this.fruitType[i], this.x[i]-this.l[i]*0.5, this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10){//果实出屏幕死亡状态
				this.alive[i] = false;
			}
		}
	}
}
/*
 * 果实出生在随机海葵上
 */
fruitObj.prototype.born = function(i){
	this.alive[i] = true;
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	//出生在相同地方时
}
/*
 * 食物检测，当果实少于20时，就又出生果实
 */
function fruitMonitor(){
	var num = 0;
		for(var i=0; i<fruit.num; i++){
			if(fruit.alive[i]) num++;
		}
		if(num<20){
			sendFruit();
			return;
		}
}
/*
 * 将飘到屏幕外的果实又出生
 */
function sendFruit(){
	for(var i = 0; i<fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
