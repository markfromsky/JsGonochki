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
    speed: 3
}
function startGame(){
    start.classList.add('hide');
    gameArea.appendChild(car);
    settings.start = true;
    requestAnimationFrame(playGame);
}
function playGame(){
    console.log('game started');
    if(settings.start){
        requestAnimationFrame(playGame);
    }
}
function startmove(event){
    event.preventDefault();
    event[event.key] = true;
}
function stopMove(event){
    event.preventDefault();
    event[event.key] = false;
}