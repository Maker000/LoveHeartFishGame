var dustObj = function(){
	this.x = [];
	this.y = [];
	this.dustPic = [];
	this.amp = [];
	this.NO = [];
	this.alpha;
	this.num = 30;
}

dustObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 35+ Math.random() * 30;//左右摇摆的幅度
		this.NO[i] = Math.floor(Math.random() * 7);//任选一个灰尘图片下标
	}
	this.alpha = 0;
	for(var i=0;i<7;i++){
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "src/dust"+i+".png";
	}
}

dustObj.prototype.draw = function(){
	context1.save();
	this.alpha += deltaTime * 0.0012;
	var l = Math.sin(this.alpha);//[-1,1]变化
	for(var i=0;i<this.num;i++){
		var no = this.NO[i];
		context1.drawImage(this.dustPic[no], this.x[i] + l * this.amp[i], this.y[i]);
		context1.stroke();
	}
	context1.restore();
}