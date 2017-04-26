function Game(wG, hG, nbOfMines) {
    assert(wG > 0 && hG > 0 && nbOfMines >= 0 && nbOfMines <= wG*hG);
    
    // initializations
    this.leftToWin = wG*hG - nbOfMines - 1;
    this.case = [];
    this.minesGuessed = 0;
    this.mines = [];
    this.wG = parseInt(wG);
    this.hG = parseInt(hG);
    this.nbOfMines = parseInt(nbOfMines);
    this.sizeX = w/this.wG;
    this.sizeY = h/this.hG;
    this.win = false;
    this.lose = false;
    
    // canvas creation : 
    w = wMax;
    h = hMax;
    if (this.sizeX < this.sizeY) {
        this.sizeY = this.sizeX;
        h = this.hG*this.sizeX;
    } else if (this.sizeX > this.sizeY) {
        this.sizeX = this.sizeY;
        h = this.hG*this.sizeX;
    }
    
    

    this.createBoard = function() {        
        for (var i = 0; i < this.wG; i++) {
            this.case[i] = [];
            for (var j = 0; j < this.hG; j++) {
                this.case[i][j] = new Case(i, j, this.sizeX, this.sizeY);
            }
        }
    }
    
    this.setMines = function() {
        for (var i = 0; i < this.nbOfMines; i++) {
            let myMine;
            do {
                let x = floor(random(this.wG));
                let y = floor(random(this.hG));
                myMine = new createVector(x, y);
                
                console.log("x = " + x);
                console.log("y = " + y);
                
            } while (this.containsMines(myMine));
            this.mines.push(myMine);
            console.log(this.mines.length);
        }
    }
    
    this.containsMines = function(myMine) {
        for (let i = 0; i < this.mines.length; i++) {
            if (this.mines[i].x === myMine.x) {
                if(this.mines[i].y === myMine.y) {
                    return true;
                }
            }
        }
        return false;
    }
    
    this.setCaseValues = function() {
        for (var i = 0; i < this.mines.length; i++) {
            let x = this.mines[i].x;
            let y = this.mines[i].y;
            
            // sets mine value to -1
            this.case[x][y].type = -1;
                        
            // inform all neightboors they are near a mine
            this.applyToNeighbor(x, y, this.add, this);
        }
    }
    
    this.add = function(x, y) {
        if(this.case[x][y].type !== -1) {
            this.case[x][y].type++;
        }
    }
    
    this.draw = function() { 
        textSize(this.sizeX);
        for (var i = 0; i < this.wG; i++) {
            for (var j = 0; j < this.hG; j++) {
                this.case[i][j].drawCase();
            }
        }
    }
    
    
    this.applyToNeighbor = function(x, y, func, funcObj) {
        
        if (x > 0) {
            if (y > 0) {
                func.apply(funcObj, [x-1, y-1]);
            }
            
            func.apply(funcObj, [x-1, y]);
            
            if (y < this.hG-1) {
                func.apply(funcObj, [x-1, y+1]);
            }
        }
        
        if (y > 0) {
            func.apply(funcObj, [x, y-1]);
        }        
        
        if (y < this.hG-1) {
            func.apply(funcObj, [x, y+1]);
        }
        
        
        if (x < this.wG-1) {
            if (y > 0) {
                func.apply(funcObj, [x+1, y-1]);
            }
            
            func.apply(funcObj, [x+1, y]);
        
            if (y < this.hG-1) {
                func.apply(funcObj, [x+1, y+1]);
            }
        }
    }
    
    
    this.selection = function() {
        if (this.win || this.lose) {
            session.newMenu();
        } else {
            let x = floor(mouseX/this.sizeX);
            let y = floor(mouseY/this.sizeY);

            if (this.case[x][y].discovered === 0) {
                this.selectionGuess(x, y);
            } else if (this.case[x][y].discovered === -1) { 
                this.minesGuessed--;
                this.applyToNeighbor(x, y, this.remNearbyGuess, this);
                this.selectionDiscover(x, y);
            } else if (this.case[x][y].discovered === 1) {
                this.discoverAroundCheck(x, y);
            }
        }
    }
    
    this.discoverAroundCheck = function(x, y) {
        if (this.case[x][y].nearbyGuess === this.case[x][y].type) {
            this.applyToNeighbor(x, y, this.discoverAround, this);
        }
    }
    
    this.discoverAround = function(x, y) {
        if (this.case[x][y].discovered !== -1) {
            this.selectionDiscover(x, y);
        }
    }
    
    this.addNearbyGuess = function(x, y) {
        this.case[x][y].nearbyGuess++;
    }
    
    this.remNearbyGuess = function(x, y) {
        this.case[x][y].nearbyGuess--;
    }
    
    this.selectionGuess = function(x, y) {
        this.case[x][y].discovered = -1;
        this.minesGuessed++;
        this.applyToNeighbor(x, y, this.addNearbyGuess, this);
        
        if (this.minesGuessed === this.nbOfMines) {
            this.checkGuess();
        }        
    }
    
    this.checkGuess = function() {
        for (var i = 0; i < this.nbOfMines; i++) {            
            let x = this.mines[i].x;
            let y = this.mines[i].y;
            if (this.case[x][y].discovered !== -1){
                return;
            }
        }
        this.win = true;
    }
    
    
    this.selectionDiscover = function(x, y) {
        if (this.case[x][y].type === -1) {
            for (var i = 0; i < this.nbOfMines; i++) {
                let x = this.mines[i].x;
                let y = this.mines[i].y;
                this.case[x][y].discovered = 1;
            }
            this.lose = true;
        } else if (this.leftToWin === 1) {
            this.case[x][y].discovered = 0;
            this.win = true;
        } else {
            this.discoverCase(x, y);
        }
    }
    
    this.discoverCase = function(x, y) {    
        if (this.case[x][y].discovered !== 1){

            this.case[x][y].discovered = 1;
            this.leftToWin--;
            if (this.leftToWin === 0) {
                this.win = true;
            }

            if (this.case[x][y].type === 0) {
                this.applyToNeighbor(x, y, this.discoverCase, this);
            }
        }
    }
    
    
    this.createBoard();
    this.setMines();
    this.setCaseValues();
}