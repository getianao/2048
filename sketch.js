let grid;
let grid_new;
let score=0;

function setup(){
	createCanvas(400,400);
	noLoop();
	grid=blankGrid();
	grid_new=blankGrid();
	// console.table(grid);
	addNumber();
	addNumber();
	updateCanvas();
    // console.table(grid);

}

function updateCanvas(){
	background(255);
	drawGrid();
	select('#score').html(score);
}



//One move
function keyPressed(){

	let gameOver=isGameOver(grid);
	if(gameOver)
	{
		console.log("Game Over!");
		return;
	}
	let gameWon=isGameWon(grid);
	if(gameWon)
	{
		console.log("Game Won!");
		return;
	}

	console.log(keyCode);
	let flipped=false;
	let rotated=false;
	let played=true;
	switch(keyCode){
		case LEFT_ARROW:
		{
			//DO NOTHING
			break;
		}
		case RIGHT_ARROW:
		{
			grid=flipGrid(grid);
			flipped=true;
			break;
		}
		case UP_ARROW:
		{
			grid=rotateGrid(grid);
			rotated=true;
			break;
		}
		case DOWN_ARROW:
		{
			grid=rotateGrid(grid);//rotate first
			rotated=true;
			grid=flipGrid(grid);
			flipped=true;	
			break;
		}
		default:
			played=false;
	}


	if(played){
		let past=copyGrid(grid);
		for(let i=0;i<4;i++)
		{
			grid[i]=operate(grid[i]);
		}
		
		let changed=compare(past,grid);
		if(flipped)
		{
			grid=flipGrid(grid);
		}
		if(rotated)
		{
			grid=rotateGrid(grid);
		}
		if(changed)
		{
			addNumber();
		}
		updateCanvas();
		
	}
}
