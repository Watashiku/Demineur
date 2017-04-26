function Case(i, j, sizeX, sizeY) {
    this.i = parseInt(i);
    this.j = parseInt(j);
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.discovered = 0;
    this.type = 0;
    this.greenAmount = 50*(1+Math.sin(millis()));
    this.nearbyGuess = 0;
    
    
    
    
    this.drawCase = function() {
        
        fill(200);
        rect(this.i*this.sizeX, this.j*this.sizeY, this.sizeX, this.sizeY);
        
        let d = this.discovered;
        if (d === 0) {
            this.drawCaseUndiscovered();
        } else if (d === -1) {
            this.drawCaseMarked();
        } else if (d === 1) {
            if (this.type === -1) {
                this.drawCaseMine();
            } else {
                this.drawCaseDiscovered();
            } 
        }
    }
    
    this.drawCaseUndiscovered = function() {
        let x = (this.i+0.1)*this.sizeX;
        let y = (this.j+0.1)*this.sizeY;
        if (this.win && this.type !== -1) {
            let f = 100*(1+Math.sin(sinSpeed*millis()/1000));
            fill(f, f, 200);
        } else {
            fill(100, 100, 100);
        }
        rect(x, y, this.sizeX*0.9, this.sizeY*0.9);
    }
    
    this.drawCaseMarked = function() {
        this.drawCaseUndiscovered(this.i, this.j);
        fill(255);
        let x = (this.i+0.3)*this.sizeX;
        let y = (this.j+0.3)*this.sizeY;
        rect(x, y, this.sizeX/2, this.sizeY/2);
    }
    
    this.drawCaseDiscovered = function() {
        let m = 255/3 * Math.pow(this.type, 0.8);

        if (session.game.win) {
            m += (255-m)*(0.5 + Math.sin(sinSpeed*millis()/1000)/2);
            let f = 75*(1+Math.sin(sinSpeed*millis()/1000));
            
            if (this.type === 0) {
                fill(f/2, f/2, 50+f/4);
                rect((this.i+0.1)*this.sizeX, (this.j+0.1)*this.sizeY, 0.9*this.sizeX, 0.9*this.sizeY);
            } else {
                fill(f, f, 100+f/2);
                rect((this.i+0.1)*this.sizeX, (this.j+0.1)*this.sizeY, 0.9*this.sizeX, 0.9*this.sizeY);

                fill(255, this.greenAmount-f, m);
                let message = this.type;
                let x = (this.i+0.5)*this.sizeX - textWidth(message)/2;
                let y = (this.j+0.9)*this.sizeY;
                text(message, x, y);
            }
            
        } else {
            if (this.type === 0) {
                fill(175);
                rect((this.i+0.1)*this.sizeX, (this.j+0.1)*this.sizeY, 0.9*this.sizeX, 0.9*this.sizeY);
            } else {
                fill(150);
                rect(this.i*this.sizeX, this.j*this.sizeY, this.sizeX, this.sizeY);

                fill(255, this.greenAmount, m);
                let message = this.type;
                let x = (this.i+0.5)*this.sizeX - textWidth(message)/2;
                let y = (this.j+0.9)*this.sizeY;
                text(message, x, y);
            }
        }
    }
    
    this.drawCaseMine = function() {
        let n = 177+177*Math.sin(10*sinSpeed*millis()/1000);
        n = floor(n);
        fill(255, n, n);
        rect(this.i*this.sizeX, this.j*this.sizeY, this.sizeX, this.sizeY);
    }
}