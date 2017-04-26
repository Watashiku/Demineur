function Menu() {
    let level;
    
    this.sizeX = 3*wMax/5;
    this.sizeY = hMax/8;
    
    this.xEasy = wMax/5;
    this.yEasy = hMax/16;
    this.iEasy = 10;
    this.jEasy = 10;
    this.mEasy = 10;
    this.xMedium = wMax/5;
    this.yMedium = 5*hMax/16;
    this.iMedium = 15;
    this.jMedium = 15;
    this.mMedium = 20;
    this.xHard = wMax/5;
    this.yHard = 9*hMax/16;
    this.iHard = 25;
    this.jHard = 15;
    this.mHard = 35;
    this.xPerso = wMax/5;
    this.yPerso = 13*hMax/16;
    this.iPerso = 10;
    this.jPerso = 10;
    this.mPerso = 10;
    
    
    this.selection = function() {
        let x = mouseX;
        let y = mouseY;
        if (x === constrain(x, this.xEasy, this.xEasy+this.sizeX)) {
            if (y === constrain(y, this.yEasy, this.yEasy+this.sizeY)) {
                session.newGame(this.iEasy, this.jEasy, this.mEasy);
            }
        }
        if (x === constrain(x, this.xMedium, this.xMedium+this.sizeX)) {
            if (y === constrain(y, this.yMedium, this.yMedium+this.sizeY)) {
                session.newGame(this.iMedium, this.jMedium, this.mMedium);
            }
        }
        if (x === constrain(x, this.xHard, this.xHard+this.sizeX)) {
            if (y === constrain(y, this.yHard, this.yHard+this.sizeY)) {
                session.newGame(this.iHard, this.jHard, this.mHard);
            }
        }
        if (x === constrain(x, this.xPerso, this.xPerso+this.sizeX)) {
            if (y === constrain(y, this.yPerso, this.yPerso+this.sizeY)) {
                session.newGame(this.iPerso, this.jPerso, this.mPerso);
            }
        }
    }
    
    this.draw = function() {
        background(220);
        let x1;
        let y1;
        let sx1 = this.sizeX;
        let sy1 = this.sizeY;
        let x2;
        let y2;
        let sx2;
        let sy2;
        
        textSize(this.sizeY/4);
        
        for (var i = 0; i < 4; i++) {
            fill(180);
            x1 = wMax/5;
            y1 = (1+4*i)*hMax/16;;
            rect(x1, y1, sx1, sy1);
            fill(140);
            x2 = x1 + 0.01*sx1;
            y2 = y1 + 0.05*sy1;
            sx2 = sx1*0.98;
            sy2 = sy1*0.9;
            rect(x2, y2, sx2, sy2);
        }
        
        y2 = this.yEasy + sy1*0.66  ;
        fill(180, 30, 30);
        text("Easy ", this.xEasy*1.1, y2);
        fill(255);
        text(this.iEasy + " x " + this.jEasy, this.xEasy*2, y2);
        text(this.mEasy + " mines", this.xEasy*3, y2);
        
        y2 = this.yMedium + sy1*0.66;
        fill(180, 30, 30);
        text("Med ", this.xMedium*1.1, y2);
        fill(255);
        text(this.iMedium + " x " + this.jMedium, this.xMedium*2, y2);
        text(this.mMedium + " mines", this.xMedium*3, y2);
        
        y2 = this.yHard + sy1*0.66;
        fill(180, 30, 30);
        text("Hard ", this.xHard*1.1, y2);
        fill(255);
        text(this.iHard + " x " + this.jHard, this.xHard*2, y2);
        text(this.mHard + " mines", this.xHard*3, y2);
        
        y2 = this.yPerso + sy1*0.66;
        fill(180, 30, 30);
        text("Perso ", this.xPerso*1.1, y2);
        fill(255);
        text(this.iPerso + " x " + this.jPerso, this.xPerso*2, y2);
        text(this.mPerso + " mines", this.xPerso*3, y2);
        
    }   
}
