document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

//window.onload = start;

WebFontConfig = {
    google: {
      families: ['Zhi Mang Xing']
    }
};

FONT = WebFontConfig.google.families[0]; 

function start(){
    WIDTH = 120*12; 
    HEIGHT = 600;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '');

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", game_main);
    
    game.state.start("Boot");  
};

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}   
    }, 1000);
}

var boot = function(game){};

boot.prototype = {
    preload: function(){
    	 game.stage.backgroundColor = '#000000';
    },
    
    create: function(){     
        if (this.game.device.desktop){
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(false, true);
        }
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(false, true);
        }
        
        game.state.start('Preloader');
    }
};