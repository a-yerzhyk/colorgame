var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//Number of squares defined by game mode. Default mode is "Easy" with 3 squares.
var numSquares = 3;
//all colors
var colors = generateColors(numSquares);
//color to win game
var pickedColor = pickColor();

//Initializing after page first loading
init();

//New Colors
resetButton.addEventListener("click", function() {
	reset();
});

function init () {
	//Mode Buttons event listeners
	setupModeButtons();
	//Generate New Colors First Time Page Is Loaded
	setupSquares();

	reset();
}

function reset () {
	// genetrate all new colors
	colors = generateColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
}

function setupModeButtons () {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function setupSquares () {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners 
		squares[i].addEventListener("click", function () {
			//take color of clicked square
			var clickedColor = this.style.backgroundColor;
			//check is color equal to win color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				//change all colors to target color
				changeAllColors(clickedColor);
				//change reset button text to "Play again?"
				resetButton.textContent = "Play Again?"
			} else {
				//hide the square
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		})
	}
}

function changeAllColors (color) {
	for (var i = 0; i < squares.length; i++) {
		//change squares color
		squares[i].style.backgroundColor = color;
		//change header color
		h1.style.backgroundColor = color;
	}
}

function pickColor () {
	var random = Math.floor(Math.random() * colors.length);
	//return color from an array with random index
	return colors[random];
}

function generateColors(num) {
	var arr = [];
	//push random colors to an array
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function randomColor () {
	//randomize red from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//randomize green from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//randomize blue from 0 to 255
	var b = Math.floor(Math.random() * 256);

	//make rgb
	color = "rgb(" + r + ", " + g + ", " + b + ")";

	return color;
}