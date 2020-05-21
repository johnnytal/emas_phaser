var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px', fill: 'white', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px', fill: 'lightgrey', align: 'center'
        });
        
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
         
        game.load.image('bg', 'assets/oranim/images/bg3.jpg');
        
        game.load.image('box0', 'assets/oranim/images/box1.png');
        game.load.image('box1', 'assets/oranim/images/box2.png');
        game.load.image('box2', 'assets/oranim/images/box3.png');
        game.load.image('box3', 'assets/oranim/images/box4.png');
        game.load.image('box4', 'assets/oranim/images/box5.png');
        game.load.image('box5', 'assets/oranim/images/box6.png');
        
        game.load.image('clipper', 'assets/oranim/images/clipper.png');
        game.load.image('key', 'assets/oranim/images/key.png');
        game.load.image('puncher', 'assets/oranim/images/puncher.png');
        game.load.image('ruler', 'assets/oranim/images/ruler.png');
        game.load.image('scissors', 'assets/oranim/images/scissors.png');
        game.load.image('stapler', 'assets/oranim/images/stapler.png');
        game.load.image('can', 'assets/oranim/images/can.png');
        game.load.image('saw', 'assets/oranim/images/saw.png');
        
        game.load.image('power_reset', 'assets/oranim/images/power_reset.png');

		game.load.audio('clipper', 'assets/oranim/audio/clipper.mp3');
		game.load.audio('key', 'assets/oranim/audio/key.mp3');
		game.load.audio('puncher', 'assets/oranim/audio/puncher.mp3');
        game.load.audio('ruler', 'assets/oranim/audio/ruler.mp3');
        game.load.audio('scissors', 'assets/oranim/audio/scissors.mp3');
        game.load.audio('stapler', 'assets/oranim/audio/stapler.mp3');
        game.load.audio('can', 'assets/oranim/audio/can.mp3');
        game.load.audio('saw', 'assets/oranim/audio/saw.mp3');
        
        game.load.audio('clock', 'assets/oranim/audio/clock.mp3');
    },
    
    create: function(){
       game.state.start("Game");
    },
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
