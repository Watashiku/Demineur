// there is one session per run
// managing menus and games
function Session() {
    this.menu;
    this.inMenu = true;
    this.game;
    this.inGame = false;
    
    this.newGame = function(w, h, m) {
        this.inMenu = false;
        this.inGame = true;
        this.game = new Game(w, h, m);
    }
    
    this.newMenu = function() {
        this.inMenu = true;
        this.inGame = false;
        this.menu = new Menu();        
    }
    
    this.draw = function() {
        if (this.inMenu) {
            this.menu.draw();
        } else if (this.inGame) {
            this.game.draw();
        }
    }
    
    this.mousePressed = function() {
        if (this.inMenu) {
            this.menu.selection();
        } else if (this.inGame) {
            this.game.selection();
        }
    }
    
}