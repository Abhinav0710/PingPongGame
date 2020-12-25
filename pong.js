const canvas=document.getElementById("pong");
const ctx=canvas.getContext('2d');

const ball={
x:canvas.width/2,
y:canvas.height/2,
radius:10,
velocityX:5,
velocityY:5,
speed:7,
color: "White"
}

const user={
    x:0,
    y:(canvas.height-100)/2,
    width:10,
    height:100,
    score:0,
    color:"White"
}

const com={
    x:(canvas.width-10),
    y:(canvas.height-100)/2,
    width:10,
    height:100,
    score:0,
    color:"White"
}


const net={
    x:(canvas.width-2)/2,
    y:0,
    width:2,
    height:10,
    color:"White"
}


function drawText(text,x,y)
{
    ctx.fillStyle="#FFF";
    ctx.font="75px fantasy";
    ctx.fillText(text,x,y);

}



function drawRect(x,y,w,h,color)
{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}


function drawArc(x,y,r,color)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener("mousemove",getMousePos);

function getMousePos(evt){
    let rect=canvas.getBoundingClientRect();
    user.y=evt.clientY-rect.top-user.height/2;

}


function resetball()
{
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;
    ball.velocityX=-ball.velocityX;
    ball.speed=7;
}



function drawNet(){
    for(let i=0;i<=canvas.height;i+=15)
    {
        drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}


function collision(b,p){
    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;

    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    return p.left<b.right && p.top<b.bottom && p.right>b.left && p.bottom>b.top;
}


function update(){
    if(ball.x-ball.radius<0)
    {
        com.score++;
        resetball();
    }
    else if(ball.x+ball.radius>canvas.width){
        user.score++;
        resetball();
    }

        ball.x+=ball.velocityX;
        ball.y+=ball.velocityY;


        com.y+=((ball.y-(com.y+com.height/2)))*0.1;


        if(ball.y+ball.radius>canvas.height || ball.y-ball.radius<0)
        {
            ball.velocityY=-ball.velocityY;
        }

        let player=(ball.radius+ball.x<canvas.width/2)?user:com;

        if(collision(ball,player))
        {
            let collidepoint=(ball.y-(player.y+player.height/2));

            collidepoint/=(player.height/2);

            let anglerad=(Math.PI/4)*collidepoint;

            let direction=(ball.radius+ball.x<canvas.width/2)?1:-1;

            ball.velocityX=direction*ball.speed*Math.cos(anglerad);
            ball.velocityY=ball.speed*Math.sin(anglerad);
            ballspeed+=0.1;
        }
    
}



function render()
{
    //canvas 
    drawRect(0,0,canvas.width,canvas.height,"#000");
    //user score
    drawText(user.score,canvas.width/4,canvas.height/5);
    //comp score
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    //draw net
    drawNet();
    //draw user's paddle
    drawRect(user.x,user.y,user.width,user.height,user.color);
    //draw comp's paddle
    drawRect(com.x,com.y,com.width,com.height,com.color)
    //draw ball
    drawArc(ball.x,ball.y,ball.radius,ball.color);

}


function game()
{
    update();
    render();
}

let framepersecond=50;

//call the game 50 times per second
let loop=setInterval(game,1000/framepersecond);