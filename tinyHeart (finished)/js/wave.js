var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
	this.alpha = 1;
	this.num = 10;
	this.waveType = [];//1 为吃普通食物，2 为吃蓝色果实，3 为喂小鱼
}

waveObj.prototype.init  = function(){
	for(var i=0; i<this.num;i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//吃普通食物产生白色的圈
			if(this.waveType[i] == 1){
				context1.save();
				this.r[i] += deltaTime * 0.05;
				if(this.r[i]>40){
					this.alive[i]=false;//就不会绘制了
					break;//进行下一次循环
				}
				this.alpha=1-this.r[i]/40;
				context1.lineWidth = 3;
				context1.shadowBlur = 10;
				context1.shadowColor = "rgba(134,45,145,1)";
				context1.beginPath();
				context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				context1.closePath();
				context1.strokeStyle = "rgba(255,255,255,"+this.alpha+")";
				context1.stroke();//绘制
				context1.restore();
			}
			//吃到蓝色果实产生蓝色圈
			else if(this.waveType[i] == 2){
				context1.save();
				this.r[i] += deltaTime * 0.05;
				if(this.r[i]>40){
					this.alive[i]=false;//就不会绘制了
					break;//进行下一次循环
				}
				this.alpha=1-this.r[i]/40;
				context1.lineWidth = 3;
				context1.shadowBlur = 10;
				context1.shadowColor = "rgba(65,105,225,1)";
				context1.beginPath();
				context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				context1.closePath();
				context1.strokeStyle = "rgba(65,105,225,"+this.alpha+")";
				context1.stroke();//绘制
				context1.restore();
			}
			//喂小鱼时产生橙色圈
			else if(this.waveType[i] == 3){
				context1.save();
				this.r[i] += deltaTime * 0.05;
				if(this.r[i]>90){
					this.alive[i]=false;//就不会绘制了
					break;//进行下一次循环
				}
				context1.lineWidth = 4;
				context1.shadowBlur = 10;
				context1.shadowColor = "rgba(203,91,0,1)";
				this.alpha=1-this.r[i]/90;
				context1.beginPath();
				context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				context1.closePath();
				context1.strokeStyle = "rgba(203,91,0,"+this.alpha+")";
				context1.stroke();//绘制
				context1.restore();
			}
		}
	}
}

waveObj.prototype.born = function(x,y,z){
	for(var i = 0; i<this.num;i++){
		if(!this.alive[i]){
			this.x[i] = x;
			this.y[i] = y;
			this.waveType[i] = z;
			this.alive[i] = true;
			if(z==1 || z==2){
				this.r[i] = 10;
			}else{
				this.r[i] = 18;
			}
			
			return;//出生一个
		}
	}
}
