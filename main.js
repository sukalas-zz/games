var main = function(){
	var gridW = 500;
	var gridH = 500; 

	var cols = 4;
	var rows = 4;

	cellWidth = gridW/cols;
	cellheight = gridH/rows;

	bgX = 0;
	bgY = 0;
	randRow = Math.floor(Math.random()*(3));
	randCol = Math.floor(Math.random()*(3));

	var counter = 0;
	var cells = new Array([]);

	byClass('container').style.width = gridW+"px";
	byClass('container').style.height = gridH+"px";

	var empty = false;
	var temp = null;
	var once = true;
	var arrId = [];
	var arrEmpty = [];
	var arrInit = [];
	var c = 0;

	//Grid Generator
	for(var i=0;i<4;i++){
		cells[i] = []; // Initialize inner array
		for(var j=0;j<4;j++){

			cell = make('DIV');
			cell.style.width = cellWidth+"px";
			cell.style.height = cellheight+"px";
			cell.style.border = "1px solid black";

			cell.className = 'cell';
			cell.id = '#'+i+'_'+j;

			cells[i][j] = cell;
			cells[i][j].id = cell.id;

			cells[i][j].posRow = i;
			cells[i][j].posCol = j;
			cells[i][j].initial = i+"_"+j;

			cell.empty = empty;
			
			append("container", cells[i][j]);
			byId(cells[i][j].id).style.backgroundPosition = bgX+'px '+bgY+'px';
			byId(cells[i][j].id).style.backgroundImage = "url('./imgs/monks.jpg')";

			cells[i][j].onclick =  function(){
				if(once){
					shuffle();
					once = !once;
				}else{
					elem = this;
					lookUp(elem);
				}
			}
			counter++;
		bgX -= gridW/cols;
		}
	bgY -= gridH/rows;
	}

		var shuffle = function(){
			// console.log("I am gonna mix em up!")
	 		$(".container").each(function(){
	            var divs = $(this).find('div');
	            for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
	            //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
	            var i = divs.length;
	            if ( i == 0 ) return false;
	            while ( --i ) {
	               var j = Math.floor( Math.random() * ( i + 1 ) );
	               var tempi = divs[i];
				   var tempj = divs[j];
	               divs[i] = tempj;
	               divs[j] = tempi;
	             }
	            for(var i = 0; i < divs.length; i++) {
	            	$(divs[i]).appendTo(this);
	            }
				//Storing original id order from 2d to 1d array
				for(var i=0;i<4;i++){
					for(var j=0;j<4;j++){
						arrId[c] = cells[i][j].id;
						arrEmpty[c] = cells[i][j].empty;
						arrInit[c] = cells[i][j].initial;
						c++;
					}
				}
				//Setting original order of ID's
				for(var x=0;x<16;x++){
					divs[x].id = arrId[x];
					divs[x].empty = arrEmpty[x];
					divs[x].initial = arrInit[x];
					
					cells[randRow][randCol].empty = !empty;
					cells[randRow][randCol].style.opacity = "0";
					cells[randRow][randCol].style.color  = "black";

					if(divs[x].empty){
						console.log("empty is at: ",divs[x].id)
					}
				}
	        });                    
			counter++;
		}

		var lookUp = function(elem){
			var id = elem.id;
			var row = parseInt(id.substring(1, 2));
			var col = parseInt(id.substring(3, 4));

			var checkDown, checkRight, checkUp, checkLeft;
			checkDown = checkRight = checkUp = checkLeft = false;

			try { checkDown = byId("#"+(row+1)+"_"+col).empty } catch( error ){}
			try { checkRight = byId("#"+(row)+"_"+(col+1)).empty } catch( error ){}
			try { checkUp = byId("#"+(row-1)+"_"+col).empty } catch( error ){}
			try { checkLeft = byId("#"+row+"_"+(col-1)).empty } catch( error ){}

			if(checkDown){
			    movePiece(byId("#"+(row+1)+"_"+col), "DOWN")//DOWN
			}
			else if(checkRight){
			    movePiece(byId("#"+(row)+"_"+(col+1)), "RIGHT")//RIGHT)
			}
			else if(checkUp){
			    movePiece(byId("#"+(row-1)+"_"+col), "UP")//UP)
			}
			else if(checkLeft){
			    movePiece(byId("#"+(row)+"_"+(col-1)), "LEFT")//LEFT)
			}

	    }

	    var movePiece = function(elem, dir){
			var id = elem.id;

			var row = parseInt(id.substring(1, 2));
			var col = parseInt(id.substring(3, 4));
			cntr = 0;

			if(dir == "RIGHT"){
				clicked = byId("#"+(row)+"_"+(col-1));
			}else if(dir == "DOWN"){
				clicked = byId("#"+(row-1)+"_"+(col));
			}else if(dir == "LEFT"){
				clicked = byId("#"+(row)+"_"+(col+1));
			}else if(dir == "UP"){
				clicked = byId("#"+(row+1)+"_"+(col));
			}


			elem.style.backgroundPosition = clicked.style.backgroundPosition;
			temp = elem.initial;
			elem.initial = clicked.initial;
			clicked.initial = temp;

			temp = elem.posRow;
			elem.posRow = clicked.posRow;
			clicked.posRow = temp;

			temp = elem.posCol;
			elem.posCol = clicked.posCol;
			clicked.posCol = temp;

			elem.empty = false;
			elem.style.opacity = 1;

			clicked.empty = true;
			clicked.style.opacity = 0;

			for(var i=0;i<numCh;i++){
				victoryCheck(elem.parentNode.children[i]);
			}
			// console.log("---------------------------------")
		}
			const numCh = byClass('container').children.length;
			var children = byClass('container').children;

			var victoryCheck = function(elem){
				var pos = "#"+elem.posRow+"_"+elem.posCol;
				var id = elem.id
				var remaining;

				if(pos === id){
					cntr++;
				}
				if(cntr == 15){
					setTimeout(function(){alert("Victory")}, 250)
				}
				remaining = (numCh - cntr);
				console.log("There are : "+remaining+" boxes remaining")
			}

}


//Helpers
var byId = function(id){
	return document.getElementById(id);
}
var byClass = function(classs){
	return document.getElementsByClassName(classs)[0];
}
var make = function(type){
	return document.createElement(type);
}
var append = function(node, child){
	return document.getElementsByClassName(node)[0].appendChild(child);
}