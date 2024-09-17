let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let start = document.querySelector(".start");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let highScore = 0;

start.addEventListener("click", function () {
	if (started == false) {
		started = true;

		levelUp();
	}
})

function gameFlash(btn) {
	btn.classList.add("gameFlash");
	setTimeout(function () {
		btn.classList.remove("gameFlash");
	}, 250)
}

function userFlash(btn) {
	btn.classList.add("userFlash");
	setTimeout(function () {
		btn.classList.remove("userFlash");
	}, 500)
}

function levelUp(btn) {
	userseq = [];
	level++;
	h2.innerText = `Level ${level}`

	let randIndx = Math.floor(Math.random() * 4);
	let randColor = btns[randIndx];
	let randBtn = document.querySelector(`.${randColor}`);
	gameFlash(randBtn);
	gameseq.push(randColor);
	
// 	console.log(randIndx);
// 	console.log(randColor);
// 	console.log(randBtn);
 }

function checkAns(indx){
	if (userseq[indx] === gameseq[indx]) {
		if (userseq.length == gameseq.length) {
			setTimeout(levelUp, 1000);
		}
	}
	else {
		h2.innerHTML = `<span style="color: red">Game Over!</span><br> Your score was: <b>${level}</b><br>Press Replay Button to start.`;
		document.querySelector("body").style.backgroundColor = "red";
		setTimeout(function () {
			document.querySelector("body").style.backgroundColor = "white";
		}, 150);

		if (highScore <= level) {
			highScore = level;
			h3.innerText = `Your Highest Score is: ${highScore}`;
		}
		start.innerText = "Replay";
		reset();
	}
}

//by user clicked
function btnPress() {
	let btn = this;
	userColor = btn.getAttribute("id");
	userseq.push(userColor);
	userFlash(btn);
	checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
	btn.addEventListener("click", btnPress);
}

function reset() {
	started = false;
	gameseq = [];
	userseq = [];
	level = 0;
}