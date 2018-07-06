
function addNumber(){
	let options=[];
	for (let i=0; i < 4; i++) {
		for (let j=0; j < 4; j++) {
			if(grid[i][j]===0){
				options.push({
					x:i,
					y:j
				});
			}
		}
	}

	if(options.length>0){
		let spot=random(options);
		let r=random(1);
        grid[spot.x][spot.y]=r>0.1?2:4;
        grid_new[spot.x][spot.y]=1;
	}

}
	

function drawGrid(){
	let w=100;
	for (let i=0; i < 4; i++) {
		for (let j=0; j < 4; j++) {
			
			let val=grid[i][j];
			if(val!=0){
                fill(colorsSizes[val].color);
                strokeWeight(2);//画笔宽度
                if(grid_new[i][j]==1)
                {
                    stroke(200,0,200);//画笔颜色
                    strokeWeight(6);
                    grid_new[i][j]=0;
                }
                else
                {
                    stroke(0);//画笔颜色
                    strokeWeight(2);
                }
               
                rect(j*w,i*w,w,w,20);

				textAlign(CENTER,CENTER);		
                noStroke();
                fill(0);
				textSize(colorsSizes[val].size);
                text(val,j*w+w/2,i*w+w/2);
    
            }
            else{
                noFill();
                strokeWeight(2);//画笔宽度
                stroke(0);//画笔颜色
                rect(j*w,i*w,w,w,20);
            }
		}
	}
}
function slide(row){
	let arr=row.filter(val => val); //找到非空元素
	let missing =4-arr.length;
	let zeros=Array(missing).fill(0);
	arr=arr.concat(zeros);
	return arr;
}

function flipGrid(grid){
	for(let i=0;i<4;i++)
	{
		grid[i].reverse();
	}
	return grid;
}

function rotateGrid(grid)
{
	let newGrid=blankGrid();
	for(let i=0;i<4;i++)
		for(let j=0;j<4;j++){
			newGrid[i][j]=grid[j][i];
		}
	return newGrid;
}

function copyGrid(grid)
{
	extra=blankGrid();;
	for (let i=0; i < 4; i++) {
		for (let j=0; j < 4; j++) {
			extra[i][j]=grid[i][j];
		}
	}
	return extra;
}

function blankGrid(){
	return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}


function combine(row){
	for(let i=0;i<=2;i++)
	{
		let a=row[i];
		let b=row[i+1];
		if(a==b)
		{
			score+=a;
			row[i]=a+b;
			row[i+1]=0;
		}
	}
}

function operate(row)
{
	row=slide(row);
	combine(row);
	row=slide(row);
	return row;
}


function compare(past,grid)
{
	for (let i=0; i < 4; i++) {
		for (let j=0; j < 4; j++) {
		if(past[i][j]!=grid[i][j])
			return true;
		}
	}
	return false;
}

