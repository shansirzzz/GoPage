let oCanvas = document.querySelector("canvas");
let ctx = oCanvas.getContext("2d");

oCanvas.width = 600;
oCanvas.height = 600;

let _snake = [];
let _direction = {
    x:-1, y:0
};
let _food = {};

let newGame = () => {
    _snake = [];
    for(let i = 0;i<5;i++){
        _snake.push({
            x:10,y:10
        })
    }

        _food = {
            x:parseInt(Math.random()*20),
            y:parseInt(Math.random()*20)
        }
}
let draw = () => {
    ctx.clearRect(0,0, oCanvas.width, oCanvas.height);
    ctx.fillStyle = 'rgba(241,242,246,0.8)';
    for(let i = 0; i<20; i++){
        for(let j = 0; j<20; j++){
            ctx.fillRect(i*30,j*30,28,28);
        }
    }
    ctx.fillStyle='rgba(47,53,66,0.8)';
    for(let i = 0;i<_snake.length;i++){
        s_body = _snake[i];
        ctx.fillRect(s_body.x*30,s_body.y*30,28,28);
        if(s_body.x == _snake[0].x && s_body.y ==_snake[0].y && i !=0 ){
            alert("GAME OVER!!!");
        }
    }
    ctx.fillStyle='rgba(55,66,250,0.8)';
    ctx.fillRect(_food.x*30,_food.y*30,28,28);
}

let move = () => {
    let newSnake = {};
    switch(_snake[0].x + _direction.x){
        case -1:
            newSnake.x = 19;
            break;
        case 20:
            newSnake.x = 0;
            break;
        default:
            newSnake.x = _snake[0].x + _direction.x;
    }
    switch(_snake[0].y + _direction.y){
        case -1:
            newSnake.y = 19;
            break;
        case 20:
            newSnake.y = 0;
            break;
        default:
            newSnake.y = _snake[0].y + _direction.y;
    }
    _snake.splice(0,0,{
        x:newSnake.x,
        y:newSnake.y
    });
    if(_snake[0].x==_food.x && _snake[0].y==_food.y){
        _food = {
            x:parseInt(Math.random()*20),
            y:parseInt(Math.random()*20)
        }
        _snake.push(_snake[-1]);   
    }
    _snake.pop()
    draw();
};
document.addEventListener("keydown",(ev)=>{
    switch(ev.key){
        case 'ArrowUp' :
            if(_direction.y !=1){
                _direction.y =-1;
                _direction.x = 0;
            } 
            break;
        case 'ArrowDown' :
            if(_direction.y !=-1){
                _direction.y = 1;
                _direction.x = 0;
            } 
            break;
        case 'ArrowLeft' :
            if(_direction.x !=1){
                _direction.y = 0;
                _direction.x =-1;
            } 
            break;
        case 'ArrowRight' :
            if(_direction.x !=-1){
                _direction.y = 0;
                _direction.x = 1;
            } 
            break;                        
    }
})
newGame();
setInterval(move,200)