var colors = []; //Array to store the random colors
var numberOfColors; //Stores the number of boxes, 3 or 6
var pickedColor; //Stores the selected color as the correct answer
var mySquares = document.querySelectorAll(".square");

//Generates random colors. How many colors are generated is determined by the numberOfColors variable. 
//We will be dealing with 6 or 3 basically.
reset(6);


//The final change where once the player has selected the correct color, the color of all the boxes is changed to the rgb value in the title
function finalChange(){
	for(let i = 0; i < mySquares.length; i++)
	{
		mySquares[i].style.backgroundColor = pickedColor;
	}
}

//Pick one random index from the array colors. This will be the correct color answer.
function pickOneRandomColor(){
//Notice that we are mutliplying by colors.length instead of 6 because we have to use the same code afterwards for 3 colors as well..
	return colors[Math.floor(Math.random() * colors.length)];
}

//Fill the colors array with random color values
function generateRandomColors(numberOfColors){

	var newRandomColor;

	for(let i = 0; i < numberOfColors; i++)
	{
		newRandomColor = "rgb(" + Math.floor(Math.random() * 256) + ", "  + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) +")";
		colors.push(newRandomColor);
	}

}

//Functionality of NEW COLORS button.
//This is supposed to start a new game when clicked.
document.querySelector("#startNewGame").addEventListener("click", function(){

	if(colors.length === 3)
	{
		reset(3);
	}

	if(colors.length === 6)
	{
		reset(6);
	}

});

//Event listener for the EASY Button
document.querySelector("#easyBtn").addEventListener("click", function(){
	//Notice how they are defined. You dont use document.querySelector(#hardBtn)
	this.classList.add("selected");
	hardBtn.classList.remove("selected");
	for(let i = 3; i < 6; i++)
	{
		mySquares[i].style.display = "none";
	}
	reset(3);

});

//Event listener for the HARD Button
document.querySelector("#hardBtn").addEventListener("click", function(){
	this.classList.add("selected");
	document.querySelector("#easyBtn").classList.remove("selected");
	//This line should show all of the squares, especially the ones that were hidden 
	//when the player selected only 3 squares to show.
	for(let i = 0; i < 6; i++)
	{
		mySquares[i].style.display = "block";
	}
	reset(6);
});

function reset(num){

	colors = [];
	document.querySelector("#message").textContent = "";
	document.querySelector("#startNewGame").textContent = "NEW COLORS";
	document.querySelector("h1").style.backgroundColor = "#232323";
	numberOfColors = num;
	//Fill the colors array with random color values
	generateRandomColors(numberOfColors);

	//Pick one random index from the array colors. This will be the correct color answer.
	pickedColor = pickOneRandomColor();

	//Changing the span in the title by using the rgb value for the correct color.
	document.querySelector("#myTitle").textContent = pickedColor;

	//Changing the colors of the squares by cycling through the colors array.
	for(let i = 0; i < colors.length; i++)
	{
		mySquares[i].style.backgroundColor = colors[i];
		mySquares[i].addEventListener("click", function()
		{
			if(this.style.backgroundColor === pickedColor)
			{
				document.querySelector("#message").textContent = "Correct!";
				finalChange();
				document.querySelector("h1").style.backgroundColor = pickedColor;
				document.querySelector("#startNewGame").textContent = "PLAY AGAIN?"
			}
			else 
				{
					document.querySelector("#message").textContent = "Try Again";
					this.style.backgroundColor = "#232323";
				}
		});
	}

}

