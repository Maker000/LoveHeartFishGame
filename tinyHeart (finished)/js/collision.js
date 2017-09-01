/*
 * 大鱼和果实的碰撞，检测距离
 */
function fruitFishCollision(){
	if(!data.gameOver){
		for(var i = 0; i<fruit.num; i++){
		if(fruit.alive[i]){
			var dis = calLength2(mom.x,mom.y,fruit.x[i],fruit.y[i]);//commonFunction中的，返回距离的平方
			if(dis<900){//食物靠近大鱼，就被吃掉，生命为false
				fruit.alive[i]=false;
				data.fruitNum++;//分数加一
				mom.bigBodyCount++;//吃到果实大鱼身体序列帧加一
				if(mom.bigBodyCount > 7){
					mom.bigBodyCount = 7;//变到最大
				}
				if(fruit.fruitType[i] == fruit.blue){
					wave.born(fruit.x[i],fruit.y[i],2);//大鱼吃掉难色就产生一个难圈
					data.double = 2;
				}else{
					wave.born(fruit.x[i],fruit.y[i],1);//大鱼吃掉橙色就产生一个白圈
					data.double = 1;
				}
			}
		}
	}
}
	}
	

function  momBabyCollision(){
	if(!data.gameOver){//游戏未结束
		if(data.fruitNum>0){//在大鱼获取有果实的情况下
			var dis2 = calLength2(mom.x, mom.y, baby.x, baby.y);
			if(dis2<900){
				baby.babyBodyCount = 0;
				mom.bigBodyCount = 0;wave.born(baby.x,baby.y,3);//大鱼喂小鱼产生一个圈
				data.addScore();
				
			}
		}
	}
	
	
}
