let w=19;
var block=new Array(w);
for(let i=0;i<block.length;i++){
    block[i]=new Array(w);
}
let wall=[];
let walllc;
let player;
let siya=3;
let mapswi=false;
let transswi=false;
let url;

function setup(){
    createCanvas(1300,800);
    player=new Player();
    player.pos=new Vec2(7,-2.5);
    player.angle=0.0001;
    makemaze();
    for(let i=0;i<wall.length;i++)  for(let j=0;j<2;j++){
        let x,y;
        x=wall[i][j].x;
        y=wall[i][j].y;
        wall[i][j].x=x*cos(-PI/6)-y*sin(-PI/6);
        wall[i][j].y=x*sin(-PI/6)+y*cos(-PI/6);
        
    }

    url=createA('https://nakkinn.github.io/home','home');
}

function draw(){
    background(60);
    
    if(mapswi){
        stroke(255);
        strokeWeight(2);
        for(let i=0;i<wall.length;i++){
            //if(wallc[i])    stroke('#44ee55');
            //else stroke(0);
            line(wall[i][0].x*20+800, wall[i][0].y*20+240, wall[i][1].x*20+800, wall[i][1].y*20+240);
        }
        player.disp();
    }


    strokeWeight(1);
    stroke(255);
    textSize(25);
    if(player.pos.x*sin(PI/6)+player.pos.y*cos(PI/6)>20){
        fill(255);
        text("ゴール",20,50);
    }
    if(player.pos.x*sin(PI/6)+player.pos.y*cos(PI/6)<4){
        fill(255);
        text("スタート",20,50);
    }
    noStroke();
    text("左クリック：進む",800,630);
    text("マウスホイール：回転",800,670);
    text("mキー：マップの表示/非表示",800,710);
    text("nキー：透過表示",800,750);

    /*for(let i=0;i<wall.length;i++){
        wallc[i]=false;
        for(let j=-1;j<2;j++){
            if(cross(wall[i][0], wall[i][1], player.pos, new Vec2(player.pos.x+siya*cos(player.angle+PI/4*j),player.pos.y+siya*sin(player.angle+PI/4*j)))){
                wallc[i]=true;
            }
        }
    }*/
    for(let i=-15;i<15;i++){
        let p=new Vec2(player.pos.x+siya*cos(player.angle+PI/60*i),player.pos.y+siya*sin(player.angle+PI/60*i));

        let v=player.pos,tem;
        let dis=[],swi=false;

        for(let j=0;j<wall.length;j++){
            //if(wallc[j]){
                let c=intersection(player.pos,p,wall[j][0],wall[j][1]);

                if(c!=null){
                    swi=true;
                    tem=dist(player.pos.x,player.pos.y,c.x,c.y);
                    dis[dis.length]=tem;
                    
                }
                

            //}   
        }
        dis=sort(dis,dis.length);
        if(swi==true){
            
            /*stroke(map(dis[0],0,siya,255,100));
            dis[0]=10000/dis[0]/cos(PI/60*i);
            
            strokeWeight(15);
            line(1500+22*i,500-constrain(dis[0]/100,0,400),1500+22*i,500+constrain(dis[0]/100,0,400))
            strokeWeight(1);*/
            let aiu;
            if(transswi==false) aiu=1;
                else            aiu=dis.length;
            for(let j=0;j<aiu;j++){
                stroke(map(dis[j],0,siya,255,70));
                dis[j]=8000/dis[j]/cos(PI/60*i);
                
                strokeWeight(15);
                line(400+22*i,500-constrain(dis[j]/100,0,400),400+22*i,500+constrain(dis[j]/100,0,400))
                strokeWeight(1)
            }
        }

    }
    if(mouseIsPressed){
        player.control();
    }
 
}



function makemaze(){
    let dir;
    let r,c,swi=true,swi2=false;
    let x=[0,1,0,-1];
    let y=[-1,0,1,0];
    r=int(random(3))*2+2;
    c=int(random(3))*2+2;

    for(let i=0;i<w;i++)   for(let j=0;j<w;j++){
        block[i][j]=1;
    }
    for(let i=0;i<w;i++){
        block[0][i]=2;
        block[w-1][i]=2;
        block[i][0]=2;
        block[i][w-1]=2;
    }

    block[r][c]=0;

    for(;;){
        if(swi2)    break;
        let counter=0;

        let saikoro=random(4);
        if(saikoro<1)   dir=0;
        else if(saikoro<2)  dir=1;
        else if(saikoro<3)  dir=2;
        else dir=3;

        if(swi){
            for(;;){
                if(block[r+2*x[dir]][c+2*y[dir]]==1){
                    block[r+x[dir]][c+y[dir]]=0;
                    block[r+2*x[dir]][c+2*y[dir]]=0;
                    r+=2*x[dir];
                    c+=2*y[dir];
                    break;
                }else{
                    dir=(dir+1)%4;
                    counter++;
                    if(counter==4){
                        swi=false;
                        break;
                    }
                }
            }

        }else{
            for(;;){
                if(block[r+x[dir]][c+y[dir]]==0){
                    block[r+x[dir]][c+y[dir]]=3;
                    block[r][c]=3;
                    r+=2*x[dir];
                    c+=2*y[dir];
                    swi=true;
                    break;
                }else{
                    dir=(dir+1)%4;
                    counter++;
                    if(counter==4){
                        for(let i=0;i<w;i++)    for(let j=0;j<w;j++){
                            if(block[i][j]==3)  block[i][j]=0;
                        }
                        swi2=true;
                        break;
                    }
                }
            }
        }
    }
    let temblock=new Array(w+6);
    for(let i=0;i<temblock.length;i++)  temblock[i]=new Array(w);
    for(let i=0;i<3;i++)    for(let j=0;j<w;j++){
        temblock[i][j]=1;
        temblock[temblock.length-1-i][j]=1;
    }
    for(let i=0;i<w;i++) for(let j=0;j<w;j++){
        if(block[i][j]==0)  temblock[i+3][j]=0;
            else temblock[i+3][j]=1;
    }
    temblock[4][8]=0;temblock[3][8]=0;temblock[2][8]=0;temblock[1][8]=0;
    temblock[3][7]=0;temblock[2][7]=0;temblock[1][7]=0;
    temblock[3][9]=0;temblock[2][9]=0;temblock[1][9]=0;
    temblock[20][8]=0;temblock[21][8]=0;temblock[22][8]=0;temblock[23][8]=0;
    temblock[21][7]=0;temblock[22][7]=0;temblock[23][7]=0;
    temblock[21][9]=0;temblock[22][9]=0;temblock[23][9]=0;
    block=temblock;
    
    let ul,ur,dl,dr;
    swi=true;
    x=1,y=4,dir=4;

    for(;;){
        if(swi==false)  break;
        ul=block[y][x];
        ur=block[y][x+1];
        dl=block[y+1][x];
        dr=block[y+1][x+1];
    
        if(dir==4){
            wall[wall.length]=new Array(2);
            wall[wall.length-1][0]=new Vec2(x,y);
            dir=1;
        }
        if(ul==0&&dl==1){
            if(dir!=0)    makewall();
            x--;
            dir=0;
        }else if(ur==1&&dr==0){
            if(dir!=1)    makewall();
            x++;
            dir=1;
        }else if(ul==1&&ur==0){
            if(dir!=2)    makewall();
            y--; 
            dir=2;
        }else if(dl==0&&dr==1){
            if(dir!=3)    makewall();
            y++;
            dir=3;
        }
        
        function makewall(){
            wall[wall.length-1][1]=new Vec2(x,y);
            if(x!=1||y!=4){
                wall[wall.length]=new Array(2);
                wall[wall.length-1][0]=new Vec2(x,y);
            }else{
                swi=false;
                wallc=new Array(wall.length);
            }
    
        }
    }


}

class Vec2{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    add(b){
        let a=this;
        return new Vec2(a.x+b.x,a.y+b.y);
    }
    sub(b){
        let a=this;
        return new Vec2(a.x-b.x,a.y-b.y);
    }

    
}

class Player{
    constructor(){
        this.pos=new Vec2(0,0);
        this.angle=0;
    }

    disp(){
        noStroke();
        fill(255);
        circle(800+this.pos.x*20,this.pos.y*20+240,10);
        stroke(255);
        line(800+this.pos.x*20, 240+20*this.pos.y, 800+20*(this.pos.x+siya*cos(this.angle+PI/4)),240+20*(this.pos.y+siya*sin(this.angle+PI/4)));
        line(800+this.pos.x*20, 240+20*this.pos.y, 800+20*(this.pos.x+siya*cos(this.angle-PI/4)),240+20*(this.pos.y+siya*sin(this.angle-PI/4)));
    }

    control(){
        if(mouseButton==LEFT){
            if(colid(this.pos.x+0.02*cos(this.angle),this.pos.y))   this.pos.x+=0.02*cos(this.angle);
            if(colid(this.pos.x,this.pos.y+0.02*sin(this.angle)))   this.pos.y+=0.02*sin(this.angle);

        }
        
    }
}

function cross(a,b,c,d){
    let s,t;
    s=(a.x-b.x)*(c.y-a.y)-(a.y-b.y)*(c.x-a.x);
    t=(a.x-b.x)*(d.y-a.y)-(a.y-b.y)*(d.x-a.x);
    if(s*t>0)   return false;
    s = (c.x - d.x) * (a.y - c.y) - (c.y - d.y) * (a.x - c.x);
    t = (c.x - d.x) * (b.y - c.y) - (c.y - d.y) * (b.x - c.x);
    if (s * t > 0)  return false;
    return true;
}

function intersection(a1,a2,b1,b2){
    let result=new Vec2(0,0);
    let a,b,c,d;
    a=(a1.y-a2.y)/(a1.x-a2.x+0.00001);
    b=a1.y-a*a1.x;
    c=(b1.y-b2.y)/(b1.x-b2.x+0.00001);
    d=b1.y-c*b1.x;
    result.x=(d-b)/(a-c);
    result.y=(a*d-b*c)/(a-c);
    if((result.x-a1.x)*(result.x-a2.x)<=0&&(result.x-b1.x)*(result.x-b2.x)<=0&&a!=c)  return result;
    else return null;
}

function mouseWheel(event){
    if(event.deltaY>0)  player.angle+=0.1;
        else            player.angle-=0.1;
}

function colid(x,y){
    let temx=x,temy=y;
    x=temx*cos(PI/6)-temy*sin(PI/6);
    y=temx*sin(PI/6)+temy*cos(PI/6);
    if(block[int(y)+1][int(x)+1]==0)    return true;
        else return false;
}

function keyPressed(){
    if(key=='m'){
        mapswi=!mapswi;
    }
    if(key=='n'){
        transswi=!transswi;
    }
}
