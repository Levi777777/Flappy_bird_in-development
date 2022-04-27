console.log('[Levis game] Flappy Bird');

const sprites = new Image();
sprites.src = './img/sprites.png';

const hit = new Audio();
hit.src = './sound/bonk_sound.mp3';
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const background = {
    spriteX : 390,
    spriteY: 5,
    width :274,
    height : 110,
    x : 0,
    y : canvas.height - 200,

    draw(){
       contexto.fillStyle = '#73c5ce';
       contexto.fillRect (0,0,canvas.width, canvas.height);
       contexto.drawImage(
        sprites,
        background.spriteX, background.spriteY,
        background.width, background.height,
        background.x, background.y,
        background.width, background.height,
       ); 

       contexto.drawImage(
        sprites,
        background.spriteX, background.spriteY,
        background.width, background.height,
        (background.x + background.width), background.y,
        background.width, background.height,
       );
    }  
}

//chão
function makeFloor(){
   const floor = {
    spriteX : 2,
    spriteY: 614,
    width :222,
    height : 94,
    x : 0,
    y : canvas.height - 90,
    update(){
        const Movefloor = 1;
        const move = floor.x - Movefloor;
        const repeat = floor.width/2;
        floor.x = move % repeat;
    },
    draw(){
       contexto.drawImage(
        sprites,
        floor.spriteX, floor.spriteY,
        floor.width, floor.height,
        floor.x, floor.y,
        floor.width, floor.height,
       ); 

       contexto.drawImage(
        sprites,
        floor.spriteX, floor.spriteY,
        floor.width, floor.height,
        (floor.x + floor.width), floor.y,
        floor.width, floor.height,
       ); 
    }    
}
return floor; 
}


function MakeCollision(FlappyBird, floor){
    const FlappyBirdY = FlappyBird.y + FlappyBird.height;
    const floorY = floor.y;

    if(FlappyBirdY>=floorY){
        return true;
    }
        return false;
}

//pásssaro

    function criaFlappyBird(){
        const FlappyBird ={
        spriteX : -7,
        spriteY: -3,
        width :45,
        height : 28,
        x : 10,
        y : 50,
        hop:4.6,
        jump(){
            console.log('will jump')
            FlappyBird.velocity = -FlappyBird.hop
        },
        velocity : 0,
        gravity: 0.25,
    
        update(){
    
            if(MakeCollision(FlappyBird, globais.floor)){
                hit.play();
                setTimeout(()=>{
                    changeScreen(screens.START)
                

                },500);
                return;
            }
    
            FlappyBird.y = FlappyBird.y + FlappyBird.velocity;
            FlappyBird.velocity = FlappyBird.velocity + FlappyBird.gravity;
        },
        
        moving: [
            {spriteX: 0, spriteY: 0},
            {spriteX: 9, spriteY: 26},
            {spriteX: 0, spriteY: 52},
        ],
    
        draw(){
           const { spriteX, spriteY } = FlappyBird.moving[1];
           contexto.drawImage(   
            sprites,
            FlappyBird.spriteX, FlappyBird.spriteY,
            FlappyBird.width, FlappyBird.height,
            FlappyBird.x, FlappyBird.y,
            FlappyBird.width, FlappyBird.height,
           ); 
        }  
    }
    return FlappyBird;
}
    
 
const MessageReady ={
    spriteX : 126,
    spriteY: 0,
    width :216,
    height : 153,
    x : (canvas.width/2) - 216/2,
    y : 50,

    draw(){
       contexto.drawImage(
        sprites,
        MessageReady.spriteX, MessageReady.spriteY,
        MessageReady.width, MessageReady.height,
        MessageReady.x, MessageReady.y,
        MessageReady.width, MessageReady.height,
       );
    }
}

const globais = {};
let ActiveScreen = {};
function changeScreen(NewScreen){
    ActiveScreen = NewScreen;
    
    if(ActiveScreen.inicializa()){
        inicializa();
    }
}

const screens = {
    START: {
        inicializa(){
            globais.FlappyBird = criaFlappyBird()
            globais.floor = makeFloor();
        },
        
        draw() {
            
            background.draw();
            globais.floor.draw();
            globais.FlappyBird.draw();
            MessageReady.draw();
        },

        click() {
            changeScreen(screens.GAME);
        },

        update(){
            globais.floor.update();
        }
    }
};

screens.GAME={
    draw(){
        
        background.draw();
        globais.floor.draw();
        globais.FlappyBird.draw();
    },

    click() {
        globais.FlappyBird.jump();
    },

    update(){
        globais.FlappyBird.update();
    }
};


function loop() {
    ActiveScreen.draw();
    ActiveScreen.update();

    requestAnimationFrame(loop)
}

window.addEventListener('click', function(){
        if(ActiveScreen.click){
            ActiveScreen.click();
        }
    }
)

changeScreen(screens.START);
loop();

