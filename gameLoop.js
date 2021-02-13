//Основной игровой цикл
function game() {
	update();
	render();
	requestAnimationFrame(game);
}

let update = () => {
	//функция отвечает за физику 
	//(движение, изменение направления и т.д)
	timer++;
	gameOver = seconds === 0 ? true : false;
	if(seconds<40 && seconds> 36) {	//вкл и выкл режим ветра
		windMode = true;
	} else {windMode = false}
	//Шары
	if(timer%indicator == 0) {	//indicator регулирует частоту появления шаров
		gameOver === false && ballArr.push( new Ball(Math.random()*(width-100), height+50, //x and y для шаров
			Math.random()*2-1, seconds>30 ? Math.random()*3+1 : Math.random()*4+2, randomNumber(50,53), //рандомные скорости шаров и их ширина
				randomNumber(0,13)));	//случайный индекс для отрисовки разных картинок шаров
	}	//пушим объект ball в массив для дальнейшей их отрисовки
	for(i in ballArr) {	
		ballArr[i].x -= ballArr[i].dx;//Двигаем шары
		ballArr[i].y -= ballArr[i].dy;
		if(windMode === true) {
			windDirection == 'left' ? ballArr[i].dx = -3 : ballArr[i].dx = 3;
			ballArr[i].dy = 2;
		} 		
		if(ballArr[i].x<0 || ballArr[i].x+ballArr[i].w>width) {
			windMode === true ? ballArr[i].dx = 0 : 
				ballArr[i].dx = -ballArr[i].dx //Меняем направление шара если он мталкивается с границей экрана
		}
		if(ballArr.length) {
			if(ballArr[i].y < -ballArr[i].h) {
				skippedBalls++;
				ballArr.splice(i, 1);	//Удаляем шар если уходит за пределы экрана и прибавляем к пропущенным
			}
		}
		//Проверка на столкновение с острием иглы
		if(ballArr[i]==undefined) {
			return
		} else {
			if(ballArr[i].y<needle.h+20-10 && ballArr[i].y>needle.h-20 && 
				needle.x+(needle.w/2) > ballArr[i].x && needle.x+(needle.w/2) < ballArr[i].x + ballArr[i].w ) {
				boomArray.push({x: ballArr[i].x, y: ballArr[i].y, animX: 0, animY: 0});	//пушим данные взрыва в масив 
				ballArr.splice(i,1); //Удаляем шар если попали по нему и прибавляем очки
				score++;	
			}
		}
		retryBtn.style.display = ballArr.length ? 'none' : 'block'; //Контроль появления кнопки retry	
	}	
	//Взрыв
	for(i in boomArray) {
		boomArray[i].animX = boomArray[i].animX + 0.5;
		if(boomArray[i].animX>4) {boomArray[i].animY++; boomArray[i].animX = 0}
		if(boomArray[i].animY>4) {boomArray.splice(i, 1)}
	}	
	//Ветер
	if(windMode === true) {
		if(windDirection ==='right') {
			wind.x -= wind.dx;
		} else {
			wind.x += wind.dx;
		}
	} 
	//Игла 
	needle.x += needle.dx;	//Эта запись нужна для управления на мобиле
	
	//Регулируем уровень сложности в зависимости от набранных очков
	if(score>20) {
		indicator = 20;
	}
	if(score>40) {
		indicator = 10;
	}
	if(score>60) {
		indicator = 5;
	}
}

function render() {
	//функция отвечает за отрисовку элементов
	ctx.drawImage(fonImg, 0, 0, width, height);
	if(windMode == true) {	//Рисуем ветер если он не уходит за границы
		ctx.drawImage(windLeftImg, wind.x, wind.y, wind.w, wind.h);	
	}
	for(i in ballArr) {
		ctx.drawImage(ballImgArray[ballArr[i].imgIndex], ballArr[i].x, ballArr[i].y, ballArr[i].w, ballArr[i].h);
	}
	ctx.drawImage(needleImg, needle.x, needle.y, needle.w, needle.h);
	for (i in boomArray) {
		ctx.drawImage(boomImg, 128*Math.floor(boomArray[i].animX), 128*Math.floor(boomArray[i].animY), 128,128, boomArray[i].x, boomArray[i].y, 100,100);
	}
	ctx.fillStyle = "#fff";
	ctx.font = "22px Comic Sans MS";
	ctx.textAlign = "center"
    ctx.fillText("Score: " + score, width-100, 20);
	ctx.fillText("Skipped Balls: " + skippedBalls, 100, 20);
	seconds === 0 ? ctx.fillStyle = "red" : ctx.fillStyle = "#fff";
	ctx.fillText(seconds ===0 ? 'Time over' : "Time: 00:" + seconds, width/2, 20);	//timer render
	if(!ballArr.length) {
		ctx.fillStyle = "red";
		ctx.font = "70px Comic Sans MS";
		ctx.fillText(`${score} balls destroyed`, width/2, height/2);
		ctx.fillText(`${skippedBalls} balls missed`, width/2, height/2+80);
		retryBtn.style.display = 'block';
	}
}













