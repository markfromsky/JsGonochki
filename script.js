const score = document.querySelector('.score'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div'),
start = document.querySelector('.start'),
starterbtn = document.querySelector('.starterbtn'),
difficulty = document.querySelector('#diff');
car.classList.add('car');
// localStorage.setItem('Record', '0');

starterbtn.addEventListener('click', startGame);
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
    traffic: 2
}
difficulty.addEventListener('change', function(){
    settings.speed = Number(this.value);
    if(this.value > 2){
        settings.traffic = 1;
    }
});
function getElementsQuantity(Height){
    return document.documentElement.clientHeight/Height;
}
function startGame(){
    gameArea.innerHTML = '';
    score.style.top = 0;
   
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
        if(Math.round(Math.random()) == 0){
            enemy.style.background = "transparent url('Carenemy.png') center / cover no-repeat";
        }
        else{
            enemy.style.background = "transparent url('Enemy2.png') center / cover no-repeat";
        }
        
        gameArea.appendChild(enemy);
    }
    start.classList.add('hide');
    gameArea.appendChild(car);
    car.style.left = (gameArea.offsetWidth/2) - (car.offsetWidth/2) + 'px';
    car.style.top = 'auto';
    car.style.bottom = 10 + 'px';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    settings.start = true;
    settings.score = 0;
    requestAnimationFrame(playGame);
}
function playGame(){
    settings.score += settings.speed;
    score.innerHTML = "Score<br>"+settings.score;
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
        line.style.top = line.y + 'px';
        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        }
    })
}
function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemy){
        let enemybox = enemy.getBoundingClientRect();
        let carbox = car.getBoundingClientRect();
        if(carbox.top <= enemybox.bottom && carbox.right >= enemybox.left && carbox.left <= enemybox.right && carbox.bottom >= enemybox.top ){
            settings.start = false;
            start.classList.remove('hide');
            score.style.top = start.offsetHeight + 'px';
            if(settings.score > localStorage["Record"]){
                localStorage.setItem('Record',settings.score);
                score.innerHTML += ' ' + 'New record';
            }    
        }

        enemy.y += settings.speed/2;
        enemy.style.top = enemy.y + 'px';
        if(enemy.y > gameArea.offsetHeight){
            enemy.y = -100;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px'; 
        }
    })

}