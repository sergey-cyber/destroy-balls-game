let cntrlLeft = document.querySelector('.cntrlLeft');
let cntrlRight = document.querySelector('.cntrlRight');
let startBtn = document.getElementById('start');
let startPage = document.querySelector('.startPage');
let retryBtn = document.getElementById('retry');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const body = document.getElementsByTagName('body');
let width = canvas.width = window.innerWidth;
console.log(window.innerWidth)
let height = canvas.height = window.innerHeight;
let timer=0;	
let score = 0;
let skippedBalls = 0;
let indicator = 30;	//Чем меньше индикатор тем выше сложность
let gameOver = false;
let windMode = false; //Режим ветра
let seconds = 59; //Для отсчета таймера

window.addEventListener("resize", function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

//Игровой фон
let fonImg = new Image();
fonImg.src = "image/fon.jpg";

let randomNumber = (minNumber, maxNumber) => {
	return Math.floor(Math.random()*maxNumber+minNumber);	//возврщает случйное число от minNumber до maxNumber
}

//Шары
let ballsPathImagesArray = [];	//Массив хранит пути к картинкам шаров
for(i=1; i<14; i++) {
	ballsPathImagesArray.push(`image/${i}.png`);
}
ballImgArray = [];	//Массив с объектами для рэндера шаров, массив нужен для отрисовки слуайных шаров из этого массива 
for(i=0; i<ballsPathImagesArray.length; i++) {
	ballImgArray.push(new Image());
	ballImgArray[i].src = ballsPathImagesArray[i];
}
const ballWidth = 60;
let ball = {	//справочный объект, для наглядности из чего состоит шар
	x: Math.random()*width, //рандомное появление шара по x
	y: height+50,
	dx: 0, dy: 3, w: randomNumber(60,80),h: ballWidth*1.33, //dx and dy скорость шара
	imgIndex: randomNumber(0,13) //хранит случайный индекс для массива шаров(для отрисовки разных) 	
};
class Ball {
	constructor(x, y, dx, dy, w, imgIndex) {
		this.x = x; this.y = y; this.dx = dx;
		this.dy = dy; this.w = w; this.h = this.w*1.33;
		this.imgIndex = imgIndex;
	}
};
let ballArr = [new Ball(Math.random()*(width-53), height+50, //x and y для шаров
	Math.random()*2-1, Math.random()*5+2, randomNumber(50,53), //рандомные скорости шаров и их ширина
		randomNumber(0,13))];	//В этот массив будем пушить объекты шаров для их отрисовки

//Игла
let needle = {x: width/2,y: 20,w: 12.8,h: 80, dx: 0};	//dx нужен для управления кнопками
let needleCenter = needle.x+(needle.w/2);
let needleImg = new Image();
needleImg.src = "image/igla.png";

//Взрыв
let boom = {x: needle.x, y: needle.y, dx: 3, dy: 0, w: 20,h: 15};//справочный объект, для наглядности из чего состоит взрыв
let boomImg = new Image();
boomImg.src = "image/boom.png";
let boomArray = [];

//Ветер 
windWidthImg = width/3;
windDirection = randomNumber(0,2) === 0 ? 'left' : 'right';
let wind = {
	x: windDirection=='left' ? -windWidthImg : width,
	y: height/2,
	w: windWidthImg,
	h: windWidthImg/2.33, dx: 6
}
let windLeftImg = new Image();
windLeftImg.src = windDirection == 'left' ? "image/windLeft.png" : "image/windRight.png";

//Timer 
const startTimer = () => {
	let gameTimer = setInterval(() => {
		if(seconds <= 0) {
			clearInterval(gameTimer);
		} else {
			seconds--;
		}
	}, 1000);	
};
startTimer();