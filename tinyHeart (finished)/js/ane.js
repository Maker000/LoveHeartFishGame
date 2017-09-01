/*
 * 海葵对象
 * 绘制海葵摆动---二次贝塞尔曲线---sin曲线表示左右摇摆
 */
var aneObj = function(){
	this.rootx = [];//开始点x轴坐标  
	this.headx = [];//海葵头部x坐标
	this.heady = [];//海葵头部y坐标
	this.alpha = 0;
	this.amp = [];//振幅
	this.num = 50;
}
//初始化海葵
aneObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 220+Math.random() * 40;//每个海葵高矮不一样
		this.amp[i] = 35+ Math.random() * 30;//震动幅度每个海葵不一样
	}
}
//绘制海葵
aneObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0012;
	var l = Math.sin(this.alpha);//[-1,1]变化
	context2.save();
	context2.globalAlpha = 0.6;
	context2.lineWidth = 21;
	context2.lineCap = "round";
	context2.strokeStyle = "#3b154e";
	for(var i=0; i<this.num; i++){
		context2.beginPath();
		context2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];//一个变化的值
		context2.quadraticCurveTo(this.rootx[i], canHeight-119,this.headx[i], this.heady[i]);
		context2.stroke();
	}
	context2.restore();
}
