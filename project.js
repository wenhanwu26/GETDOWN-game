let drawingSurface = document.getElementById("myCanvas");
let span1 = document.getElementById("span1");
let span2 = document.getElementById("span2");
let ctx = drawingSurface.getContext("2d");
let player = new Image();
player.src = "player.png";
let background = new Image();
background.src = "background.jfif"
let rock = new Image();
rock.src = "normalrock.png";
let ceils = new Image();
ceils.src = "ceils.png";
let nails = new Image();
nails.src = "nails.png";
let canvasW = 600, canvasH = 800
let x =0, y=0;
let sW = 32, sH=32;
let wSize = sW+28;
let hSize = sH+28;
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
document.onkeydown = function(){
    if(event.keyCode == 37)
        goingLeft = true;
    if(event.keyCode == 39)
        goingRight = true;
};
document.onkeyup = function(){
     if(event.keyCode == 37)
        goingLeft = false;
    if(event.keyCode == 39)
        goingRight = false;
}
let goingLeft = false, goingRight = false;
let move = 0;
let time = 0;
let speed = 1;
let life = 5000;
let lifeMax = 5000;
let stop = 1
let d = new Date();
let h = 0;
let m = 0;
let s = 0;
let restore = 1;
let damage = 5;
let acceleration = 0.005;
let hardLevel = 0;
let red = 0;
let leftStop = 0;
let rightStop = 0;
let platformsNumber = 0;
let nailsPlatformsNumber = 0;
let avoidExecute = 0;
span1.innerHTML=time;
span2.innerHTML=life;
function firstPage(){
    ctx.drawImage (background,0,0,600,800)
    ctx.drawImage (player, 257, 0, sW, sH, x, y, wSize,hSize);
    ctx.font = "40px Georgia";
    ctx.fillStyle = "blue";
    ctx.fillText("Start",250,300);
    ctx.fillText("Hard Levels",190,400);
    ctx.fillText("Instruction",200,500);
    drawingSurface.onclick = function (event){
        
        if (event.offsetX>245&&event.offsetY>270&&event.offsetX<335&&event.offsetY<300){   
           if(avoidExecute!==1){
            avoidExecute=1; 
            audio2.play();
            play ();  
           }
        }else if (event.offsetX>150&&event.offsetY>370&&event.offsetX<450&&event.offsetY<400){
            displayHardLevel();
            
        }else if(event.offsetX>200&&event.offsetY>470&&event.offsetX<400&&event.offsetY<500){
            displayInstruction();
        } 
    }
 
}
function displayHardLevel(){
    ctx.drawImage (background,0,0,600,800);
    ctx.font = "35px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText("Choose Hard Levels",150,130);
    ctx.font = "30px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("Easy",250,250);
    ctx.fillText("(default)",230,280);
    ctx.fillText("Medium",230,350);
    ctx.fillText("Hard",250,450);
    ctx.fillText("Nightmare", 210,550);
    drawingSurface.onclick = function (event){
    if(event.offsetX>250&&event.offsetY>225&&event.offsetX<310&&event.offsetY<250){
            restore = 2;
            damage = 5;
            speed = 1;
            acceleration = 0.005;
            hardLevel = 0;
            if(highestGrade.length>0)
            {
            gameOverDisplay();
        }else{
            firstPage();
          }
    }else if(event.offsetX>230&&event.offsetY>325&&event.offsetX<340&&event.offsetY<350){
            restore = 1;
            damage = 5;
            speed = 1.2;
            acceleration = 0.008;
            hardLevel = 1;
            if(highestGrade.length>0)
            {
            gameOverDisplay();
        }else{
            firstPage();
          }         
    }else if(event.offsetX>250&&event.offsetY>425&&event.offsetX<320&&event.offsetY<450){
            restore = 1;
            damage = 9;
            speed = 1.4;
            acceleration = 0.01;
            hardLevel = 2;
            if(highestGrade.length>0)
            {
            gameOverDisplay();
        }else{
            firstPage();
          }          
     }else if(event.offsetX>210&&event.offsetY>520&&event.offsetX<355&&event.offsetY<550){
            restore = 1;
            damage = 12;
            speed = 1.6;
            acceleration = 0.015;
            hardLevel = 3;
            if(highestGrade.length>0)
            {
            gameOverDisplay();
        }else{
            firstPage();
          }        
                     }
    } 
}
function displayInstruction(){
    ctx.clearRect(0,0,canvasW,canvasH);
    ctx.drawImage (background,0,0,600,800);
    ctx.font = "27px Georgia";
    ctx.fillStyle = "Grey";
    ctx.fillText("1. You will need to press the left and right",40,50);
    ctx.fillText("keys on keyboard to control the child's move.",30,80);
    ctx.fillText("2. Child intially has maximun 5000 health",40,130);
    ctx.fillText("points which can be damaged by nails.",30,160);
    ctx.fillText("3. The child's health will gradually recover",40,210);
    ctx.fillText("when outside of nails.",30,240);
    ctx.fillText("4. The game will over when the child fall into",40,290);
    ctx.fillText("the deep or the life is less than zero.",30,320);
    ctx.fillText("5. You can change the level of difficulty of",40,370);
    ctx.fillText(" game in the menu.",30,400);
    ctx.fillText("6. You can view your highest score in term of",40,450);
    ctx.fillText(" time by clicking the highest grades at the end",30,480);
    ctx.fillText(" of game",30,510);
    ctx.fillText("Go back",475,775);
    ctx.font = "40px Georgia";
    ctx.fillStyle = "lightGray";
    ctx.fillText("Enjoy the game!",160,600);
    drawingSurface.onclick = function (event){
        if (event.offsetX>475&&event.offsetY>745&&event.offsetX<570&&event.offsetY<780){   
            if(highestGrade.length>0)
            {
            gameOverDisplay();
        }else{
            firstPage();
          }
        }
    }
}
function playAgain(){
    x=0;
    y=0;
    move = 0;
    time = 0;
    red = 0;
    stop = 1;
    h = 0;
    m = 0;
    s = 0;
    life = 5000;
}
function moving(){
    
        if (goingLeft){
            if(leftStop!==1){
            if(life<2000){
            red = 4
            move = 0
            goLeft();
            }else{
            red = 0
            move = 0
            goLeft();
                }
            }
        }
        else if (goingRight){
            if(rightStop!==1){
            if(life<2000){
            red = 4;
            move = 32;
            goRight();
             }else{
            red = 0;
            move = 32;
            goRight();    
                }
            }
        }
}

function play (){
    ctx.clearRect(0,0,canvasW,canvasH);
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    start();
    startRock();
    startNails();
    let accerlate = setInterval(function (){
    span1.innerHTML=time;
    time+=1
    speed+=acceleration;
    if (stop==0){
        clearInterval(accerlate);
    }
},1000)
}

function drawCeils(){
    ctx.drawImage(ceils,0,0,100,31);
    ctx.drawImage(ceils,100,0,100,31);
    ctx.drawImage(ceils,200,0,100,31);
    ctx.drawImage(ceils,300,0,100,31);
    ctx.drawImage(ceils,400,0,100,31);
    ctx.drawImage(ceils,500,0,100,31);
}

function start (){
    let cycle=0;
    ctx.clearRect(0,0,600,800);
    let movingInterval = setInterval( function(){
        moving();
        CheckMusic();
        ctx.clearRect (x,y-speed,wSize,hSize);
        ctx.clearRect (x,y,wSize,hSize);
        ctx.drawImage (background,0,0,600,800)
        drawCeils();
        ctx.drawImage (player, cycle*sW, move, sW, sH, x, y, wSize,hSize);  
        cycle =(cycle+1)%4+red;
        scrollUp();
        scrollUpNails ();
        updateRock ();
        updateNails();
        checkCollision();
         if(y>850||life<0){
            audio2.pause();
            audio1.play();
            clearInterval(movingInterval);
            span2.innerHTML=0;
            stop = 0;
            avoidExecute = 0;
            gameOver();
        }
    }, 1);
}

function CheckMusic(){
    if(audio2.ended===true){
        audio2.play();
    }
}

function StopFunction (){
    if(platforms[platformsNumber].y+5<y+hSize){
        leftStop = 1;
        rightStop = 1;
        y+=2;
    }else{
        leftStop = 0;
        rightStop = 0;
    }
}

function StopFunctionNails (){
    if(nailsPlatforms[nailsPlatformsNumber].y+5<y+hSize){
        leftStop = 1;
        rightStop = 1;
        y+=2;
    }else{
        leftStop = 0;
        rightStop = 0;
    }
}

function gameOverDisplay(){
    ctx.clearRect(0,0,600,800);
    ctx.drawImage (background,0,0,600,800)
    ctx.drawImage (player, 257, 0, sW, sH, 0, 0, wSize,hSize);
    ctx.font = "50px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over",175,150);
    ctx.font = "40px Georgia";
    ctx.fillStyle = "grey";
    ctx.fillText("Play again",200,300);
    ctx.fillText("Instruction",200,400);
    ctx.fillText("Highest grades",170,500);
    ctx.fillText("Hard Levels",190,600);
    drawingSurface.onclick = function (event){
        if (event.offsetX>200&&event.offsetY>270&&event.offsetX<380&&event.offsetY<300){ 
            if(avoidExecute!==1){
            avoidExecute=1;
            audio2.play();
            playAgain();
            play();
            }
        }else if (event.offsetX>200&&event.offsetY>370&&event.offsetX<400&&event.offsetY<400){
            displayInstruction();
        }else if(event.offsetX>170&&event.offsetY>470&&event.offsetX<435&&event.offsetY<500){
            displayHighestGrades();
        }else if(event.offsetX>190&&event.offsetY>570&&event.offsetX<400&&event.offsetY<600){
            displayHardLevel();
        }
    }
}

function Calculate (time,h,m,s,hardLevel){
    this.time = time;
    this.h = h;
    this.m = m;
    this.s = s;
    switch(hardLevel){
        case 0 :
            this.hardLevel = "Easy";
            break;
        case 1 :
            this.hardLevel = "Medium";
            break;
        case 2 :
            this.hardLevel = "Hard";
            break;
        case 3 :
            this.hardLevel = "Nightmare";
            break;
    }
}

function gameOver(){
    highestGrade.push(new Calculate(time,h,m,s,hardLevel));
    gameOverDisplay();
    restore = 2;
    damage = 5;
    speed = 1;
    acceleration = 0.005;
    hardLevel = 0;
}

let platforms = new Array(6);
let startPoint=[new Point(0,400),new Point(100,0),new Point(250,100),new Point(480,600),new Point(100,700),new Point(400,300)];

function startRock(){
        for(i=0;i<startPoint.length;i++){
            let rx= startPoint[i].x;
            let ry= startPoint[i].y;
            platforms[i]=new Point(rx,ry);
            ctx.drawImage(rock,rx,ry,120,16);
                }
        
    }
let nailsPlatforms = new Array(2);            
let nailsStartPoints = [new Point(100,200),new Point(250,500)];

function startNails(){
        for(let i=0;i<nailsStartPoints.length;i++){
            let nx= nailsStartPoints[i].x;
            let ny= nailsStartPoints[i].y;
            nailsPlatforms[i]=new Point(nx,ny);
            ctx.drawImage(nails,nx,ny,120,16);
                }
}

function Point (x,y){
    this.x = x;
    this.y = y;
}

let child ={
    height: hSize,
    width: wSize
}

let normalRock ={
    height: 16,
    width: 120
}

function scrollUpNails (){
    for(let i=0;i<nailsPlatforms.length;i++){
        let nx = nailsPlatforms[i].x;
        let ny = nailsPlatforms[i].y;
        ny-=speed;
        nailsPlatforms[i].y=ny
        ctx.drawImage (nails,nx,ny,120,16);
}}

function scrollUp (){
    for(let i=0;i<platforms.length;i++){
        let rx = platforms[i].x;
        let ry = platforms[i].y;
        //ctx.clearRect (rx,ry,120,16);
        ry-=speed;
        platforms[i].y=ry
        ctx.drawImage (rock,rx,ry,120,16)
    }
}

let rockXposition = [0,97,193,289,382,480]
function updateRock (){
     for(let i=0;i<platforms.length;i++){
         if(platforms[i].y<-16){
             let remove = platforms.splice(i,1);
              let rx = Math.floor(Math.random()*(rockXposition.length+1));
             rx=rockXposition[rx];
        platforms.push(new Point(rx,canvasH));
        ctx.drawImage(rock,rx,canvasH,120,16);
         }
     }       
}

function updateNails(){
    for(let i=0;i<nailsPlatforms.length;i++){
         if(nailsPlatforms[i].y<-16){
             let remove = nailsPlatforms.splice(i,1);
              let nx = Math.floor(Math.random()*(rockXposition.length+1));
             nx=rockXposition[nx];
        nailsPlatforms.push(new Point(nx,canvasH));
     ctx.drawImage(nails,nx,canvasH,120,16);
         }
     }
}

function goLeft (){
    if((x-2.5)>=0){
     x-=2.5;
        }
}

function goRight (){
    if((x+2.5)<=540){
     x+=2.5;
        }
}

let highestGrade = new Array(0);
function displayHighestGrades(){
    highestGrade = highestGrade.sort(function (a, b) {
 return a.time < b.time ? 1 : -1;
});
    ctx.clearRect(0,0,canvasW,canvasH);
    ctx.drawImage (background,0,0,600,800);
    ctx.font = "40px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText("Total Times",200,50);
    ctx.font = "35px Georgia";
    ctx.fillStyle = "Grey";
    let yDisplay = 100
    let j = 0;
    if(highestGrade.length<8){
        j=highestGrade.length;
    }else{
        j=7;
    }
    for(let i=0;i<j;i++){
    ctx.fillText((i+1)+". "+highestGrade[i].time+" seconds  "+highestGrade[i].hardLevel+"  at "+highestGrade[i].h+": "+highestGrade[i].m+": "+highestGrade[i].s+"s",5,yDisplay);
        yDisplay+=100
        }
    ctx.font = "27px Georgia"
    ctx.fillText("Go back",475,775);
    drawingSurface.onclick = function (event){
    if (event.offsetX>475&&event.offsetY>745&&event.offsetX<570&&event.offsetY<780){   
            gameOverDisplay();
          }
    }
}

function checkCollision(){
    if(x<platforms[0].x+120&&x+wSize>platforms[0].x&&y<platforms[0].y+16&&hSize+y>platforms[0].y){  
           y-=speed;
           platformsNumber = 0;
           StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }
       }else if(x<platforms[1].x+120&&x+wSize>platforms[1].x&&y<platforms[1].y+16&&hSize+y>platforms[1].y){
            y-=speed;
           platformsNumber = 1;
           StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }    
 }else if(x<platforms[2].x+120&&x+wSize>platforms[2].x&&y<platforms[2].y+16&&hSize+y>platforms[2].y){   
         y-=speed;
        platformsNumber = 2;
        StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }    
     }else if(x<platforms[3].x+120&&x+wSize>platforms[3].x&&y<platforms[3].y+16&&hSize+y>platforms[3].y){
        y-=speed;
         platformsNumber = 3;
         StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }      
     }else if(x<platforms[4].x+120&&x+wSize>platforms[4].x&&y<platforms[4].y+16&&hSize+y>platforms[4].y){
         y-=speed;
         platformsNumber = 4;
         StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }      
      }else if(x<platforms[5].x+120&&x+wSize>platforms[5].x&&y<platforms[5].y+16&&hSize+y>platforms[5].y) {
          y-=speed;
          platformsNumber = 5;
          StopFunction ();
           if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
           }     
      }else  if(x<nailsPlatforms[0].x+120&&x+wSize>nailsPlatforms[0].x&&y<nailsPlatforms[0].y+16&&hSize+y>nailsPlatforms[0].y){
            y-=speed;
            life-=damage;
            red = 4;
            nailsPlatformsNumber = 0;
            StopFunctionNails ();
           span2.innerHTML=life;
     }else if(x<nailsPlatforms[1].x+120&&x+wSize>nailsPlatforms[1].x&&y<nailsPlatforms[1].y+16&&hSize+y>nailsPlatforms[1].y){
            y-=speed;
            life-=damage;
            nailsPlatformsNumber = 1;
            red = 4;
            StopFunctionNails ();
           span2.innerHTML=life;       
            }else if (y<31){
             y+=2;
             life-=damage;
             red = 4;
             span2.innerHTML=life;        
                    }else{
             y+=2
            leftStop = 0;
            rightStop = 0;
          if(life<lifeMax){
           life+=restore;
          span2.innerHTML=life;
          }
       } 
}







