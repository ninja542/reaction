/* jshint esversion:6 */

class cell{
	// x position, y position, particle reference
	constructor(x, y, size){
		this.data = null;
		this.x = x;
		this.y = y;
		this.size = size;
	}
	set(data){
		this.data = data;
	}
}

class grid{
	constructor(width, height, radius){
		this.cell_size = radius * 2;
		this.x_num = width / this.cell_size;
		this.y_num = height / this.cell_size;
		this.cells = [];
		for(let i = 0; i < this.x_num; i++){
			let column = [];
			for(let j = 0; j < this.y_num; j++){
				column.push(new cell(i, j, this.cell_size));
			}
			this.cells.push(column);
		}
	}
	// a lot more edge cases needed to figure out
	get_neighbors(x, y){
		// in the middle
		if(x > 0 && y > 0 && x < this.x_num - 1 && y < this.y_num - 1){
			return [this.cells[x + 1][y + 1], this.cells[x + 1][y - 1], this.cells[x + 1][y], this.cells[x][y + 1], this.cells[x][y - 1], this.cells[x - 1][y + 1], this.cells[x - 1][y - 1], this.cells[x - 1][y]];
		}
		// left edge
		else if(x == 0 && y > 0 && y < this.y_num - 1){
			return [this.cells[x + 1][y + 1], this.cells[x + 1][y - 1], this.cells[x + 1][y], this.cells[x][y + 1], this.cells[x][y - 1]];
		}
		// upper edge
		else if(y == 0 && x > 0 && x < this.x_num - 1){
			return [this.cells[x + 1][y + 1], this.cells[x + 1][y], this.cells[x][y + 1], this.cells[x - 1][y + 1], this.cells[x - 1][y]];
		}
		// right edge
		else if(x == this.x_num - 1 && y > 0 && y < this.y_num - 1){
			return [this.cells[x][y + 1], this.cells[x][y - 1], this.cells[x - 1][y + 1], this.cells[x - 1][y - 1], this.cells[x - 1][y]];
		}
		// lower edge
		else if(y == this.y_num - 1 && x > 0 && x < this.x_num - 1){
			return [this.cells[x + 1][y - 1], this.cells[x + 1][y], this.cells[x][y - 1], this.cells[x - 1][y - 1], this.cells[x - 1][y]];
		}
		// upper-left corner
		else if(x == 0 && y == 0){
			return [this.cells[x + 1][y + 1], this.cells[x + 1][y], this.cells[x][y + 1]];
		}
		// upper-right corner
		else if(x == this.x_num - 1 && y == 0){
			return [this.cells[x][y + 1], this.cells[x - 1][y + 1], this.cells[x - 1][y]];
		}
		// lower-left corner
		else if(x == 0 && y == this.y_num - 1){
			return [this.cells[x + 1][y - 1], this.cells[x + 1][y], this.cells[x][y - 1]];
		}
		// lower-right corner
		else if(x == this.x_num - 1 && y == this.y_num - 1){
			return [this.cells[x][y - 1], this.cells[x - 1][y - 1], this.cells[x - 1][y]];
		}
	}
}