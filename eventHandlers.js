
startBtn.onclick = () => {
	startPage.style.display = 'none';
	game();
}

window.addEventListener("mousemove", function(event) {  //Управление иглой мышью
	if(event.target.className == 'cntrlLeft' || event.target.className == 'cntrlRight') {
		return
	}
	needle.y = 20;
	needle.x = event.offsetX;
	if(event.offsetX > width-25) {
	needle.x = width - 25;
	}
});

window.addEventListener("pointerdown", function(event) {//Управление иглой для mobile версии
	if(event.target.className == 'cntrlLeft') {
		needle.dx = -13;
	} 
	if(event.target.className == 'cntrlRight') {
		needle.dx = 13;
	}
});

window.addEventListener("pointerup", function(event) {//Управление иглой для mobile версии
	if(event.target.className == 'cntrlLeft' || event.target.className == 'cntrlRight') {
		needle.dx = 0;	
	}
});

retryBtn.onclick = () => {
	indicator = 30;	//Сбрасываем стартовые параметры 
	timer=29;
	score = 0;
	skippedBalls = 0;
	seconds = 59;
	startTimer();
	gameOver = false;
	windDirection = randomNumber(0,2) === 0 ? 'left' : 'right'; //занова определяем напрваление ветра
	wind.x = windDirection=='left' ? -windWidthImg : width; //сбрасываем параметры ветра
	windLeftImg.src = windDirection == 'left' ? "image/windLeft.png" : "image/windRight.png";
}
