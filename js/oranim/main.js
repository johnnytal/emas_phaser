var game_main = function(game){    
    N_ROWS = 12;
    N_COLUMNS = 3;

    bpm = 115;
    box_n = 0;
    row = 0;
    
    boxes = [];
    items = [];
    
    OFF_SET = 19;
    HIGHLIGHT_COLOR = 0xa5ff11;
    
    chosenItem = null;
};   
 
game_main.prototype = {
    create: function(){
    	loadSounds();
    	initAd();
    	plugIns();
    	
    	bg = game.add.image(0, 0, 'bg');
    	
    	for (x = 0; x < soundsArray.length; x++){
    		sprite = game.add.sprite(50 + x * 150, 50, soundsArray[x].key);
    		sprite.inputEnabled = true;
    		sprite.events.onInputDown.add(chooseItem, this);
    		
    		items.push(sprite);
    	}
           
        tempoText = game.add.text(WIDTH - 90, 33, bpm, {font: '34px ' + FONT, fill: '#6e5443', align: 'center'});
        
        graphics = game.add.graphics(WIDTH - 150, -230);
        drawShape();
    
        graphics.inputEnabled = true;

    	graphics.events.onInputDown.add(changeTempo, this);
 
        for (n = 0; n < N_ROWS * N_COLUMNS; n++){
            box = game.add.sprite(0, 0, 'box' + Math.floor(Math.random() * 5));
            box.x = box.width * (n % N_ROWS);
            box.y = (Math.floor(Math.random() * OFF_SET) + box.height) * Math.floor(n / N_ROWS) + 
            Math.floor(Math.random() * OFF_SET + box.height / 1.5) + 100;
			
			box.inputEnabled = true;
			box.events.onInputDown.add(addItem, this);
			
            boxes.push(box);
        }

        getBox();  

        power_reset = game.add.sprite(WIDTH - 130, 98, 'power_reset');
		power_reset.inputEnabled = true;
		power_reset.events.onInputDown.add(function(){
			location.reload();
			if(AdMob) AdMob.showInterstitial();
		}, this);
		power_reset.scale.set(.85, .85);
		power_reset.alpha = 0.8;
    }
};

function changeTempo(){
 	resetBpmChange = false;
	
	if (bpm < 240){
		bpm += 25;	
	}
	else{
		bpm = 65;
	}
	
	tempoText.text = bpm;
	
	setTimeout(function(){
		resetBpmChange = true;
	}, 500);
	
	clockSfx.play();	
}

function chooseItem(_this){
	chosenItem = _this;
	
	for (x = 0; x < soundsArray.length; x++){
		if (items[x] != chosenItem){
			items[x].tint = 0xffffff;
		}
		else{
			items[x].tint = 0x00ffff;
		}
	}
}

function addItem(_this){	
	if (chosenItem != null){	
		if (_this.children < 1){ // no children
			sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
			sprite.scale.set(.76, .76);
			
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
	
			sprite.x = _this.width / 2 - sprite.width / 2;
			sprite.y = _this.height / 2 - sprite.height / 2;
			
			soundsArray[items.indexOf(chosenItem)].play();
		}
		
		else{
			if (_this.children[0].key == soundsArray[items.indexOf(chosenItem)].key){ // same child - delete
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				game.add.tween(_this).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.destroy();
					
					boxes[index] = game.add.sprite(x, y, 'box' + Math.floor(Math.random() * 5));	
					boxes[index].alpha = 0;
					
					boxes[index].inputEnabled = true;
					boxes[index].events.onInputDown.add(addItem, _this);
		
					game.add.tween(boxes[index]).to( { alpha: 1 }, 240, "Linear", true);
				});
			}	
			
			else{ // different child - replace
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.children[0].destroy();
					
					sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
					sprite.scale.set(.76, .76);
					
					sprite.alpha = 0;
					game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
			
					sprite.x = _this.width / 2 - sprite.width / 2;
					sprite.y = _this.height / 2 - sprite.height / 2;
					
					soundsArray[items.indexOf(chosenItem)].play();
				});
			}
		}
	}
}

function getBox(){
	var keyObjects = [];
	
    for (n = 0; n < boxes.length; n++){
        if (n % N_ROWS == box_n){
        	row = n;
            boxes[n].tint = HIGHLIGHT_COLOR;

            for (x = 0; x < boxes[n].children.length; x++){
                keyObjects.push(boxes[n].children[x].key);
            }
        }
        else{
            boxes[n].tint = 0xffffff;
        }
    }
    
    play_sounds(keyObjects);
    
    if (box_n < (N_ROWS - 1)) box_n++;
    else { box_n = 0; }; 
    
    setTimeout(function(){
        getBox();
    }, 60000 / bpm);
}

function play_sounds(_keys){
	for (x = 0; x < _keys.length; x++){
		for (s = 0; s < soundsArray.length; s++){
			if (_keys[x] == soundsArray[s].key){
				soundsArray[s].play();
			}
		}
	}
}

function drawShape() {
    graphics.clear();

    graphics.beginFill(0xffffff);
    graphics.lineStyle(4, 0xffffff, 1);

	graphics.drawRect(-20, 250, 150, 100);

    graphics.endFill();
    
    graphics.alpha = 0;
}

function loadSounds(){
	clipperSfx = game.add.audio('clipper', 1, false);
	keySfx = game.add.audio('key', 0.5, false);
	puncherSfx = game.add.audio('puncher', 0.8, false);
	rulerSfx = game.add.audio('ruler', 0.6, false);
	scissorsSfx = game.add.audio('scissors', 0.9, false);
	staplerSfx = game.add.audio('stapler', 0.8, false);
	canSfx = game.add.audio('can', 0.8, false);
	sawSfx = game.add.audio('saw', 0.4, false);
	
	clockSfx = game.add.audio('clock', 0.8, false);
        
	soundsArray = [
		staplerSfx, scissorsSfx, keySfx, puncherSfx, clipperSfx, rulerSfx, canSfx, sawSfx
	];
}

function plugIns(){
	setTimeout(function(){
		try{
            StatusBar.hide;
        } catch(e){} 
        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}   
	}, 1000);
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/5946900716',
    	interstitial: 'ca-app-pub-9795366520625065/3536908535'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}