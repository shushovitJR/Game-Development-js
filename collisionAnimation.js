/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 615;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
class Explosion{
    constructor(x,y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.7;
        this.height = this.spriteHeight*0.7;
        this.x=x-this.width/2;
        this.y=y-this.height/2;
        this.image = new Image();
        this.image.src = './img/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = './sounds/boom.wav'
    }
    update(){
        if (this.frame == 0) this.sound.play();
        this.timer++;
        if (this.timer%10==0){
            this.frame++;
        };
    }
    draw(){
        ctx.drawImage(this.image,this.spriteWidth*this.frame,0,this.spriteWidth,
            this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

window.addEventListener('click',function(e){
    createAnimation(e);
});

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0;i<explosions.length;i++){
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame>5){
            explosions.splice(i,1);
            i--;
        }

    }
    ctx.font = "16px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Click to Create Explosion",100,100);
    requestAnimationFrame(animate);
};
animate();