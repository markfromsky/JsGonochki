const score = document.querySelector('.score'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div'),
start = document.querySelector('.start');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startmove);
document.addEventListener('keyup', stopMove);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 1
}
function getElementsQuantity(Height){
    return document.documentElement.clientHeight/Height;
}
function startGame(){
    for(let i = 0; i < getElementsQuantity(50); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.y = (i*100);
        line.style.top = line.y + 'px';
        gameArea.appendChild(line);
    }
    for(let i = 0; i < getElementsQuantity(100*settings.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100*settings.traffic*(i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }
    start.classList.add('hide');
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    settings.start = true;

    
    requestAnimationFrame(playGame);
}
function playGame(){
    moveEnemy();
    moveRoad();
    if(settings.start){
        if(keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
            car.style.left = settings.x + 'px';
        }
        if(keys.ArrowRight && settings.x < (gameArea.offsetWidth-50)){
            settings.x += settings.speed;
            car.style.left = settings.x + 'px'; 
        }
        if(keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
            car.style.top = settings.y + 'px';
        }
        if(keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
            car.style.top = settings.y + 'px';
        }
        requestAnimationFrame(playGame);
    }
}
function startmove(event){
    event.preventDefault();
    keys[event.key] = true;
}
function stopMove(event){
    event.preventDefault();
    keys[event.key] = false;
}
function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += settings.speed;
        // console.log(line.y);
        line.style.top = line.y + 'px';
        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        }
    })
}
function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemy){
        enemy.y += settings.speed/2;
        enemy.style.top = enemy.y + 'px';
        if(enemy.y > gameArea.offsetHeight){
            enemy.y = -100;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px'; 
        }
    })

}