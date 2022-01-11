var cvs = document.getElementById("survival");
var ctx = cvs.getContext("2d");
// let stuff
let gameact = false;
let global_time = 0; // millseconds
let old_perf = 0;
let start_at = 0;
let game_time = 0;
let game_duration = 0; // seconds
//
// scenario -- test
let scenario = [
    //"MM:SS:mSmS", event(*args)
    "00:02:00", "click 50 50",
]
//
// scenario compilator
function compil(array) {
    let not_und = false; let a_arr = false;
    if(array === undefined) {console.log(`added object for compile is undefined!`)} else {not_und=true};
    if(!(array.prototype instanceof 'array') && not_und) {console.log(`added object for compile is not a array!`)} else {a_arr=true};
    if(not_und && a_arr) {
        console.log(`added array for compile ...`);
        // compilator
    };
    
};
//
// global timer
//          maximals ==> 59:59:99
//          global maximum => 5 minutes => 30 000 ticks => 300 000 millseconds
//          1 minute == 60 seconds == 6 000 ticks == 60 000 millseconds
function start_game(seconds) {
    if(!gameact) {
        gameact = true;
        game_duration = seconds;
    } else {console.log("the game is already running!")}
};
//
// scenario events
class Click {
    constructor(ideal, miss) { 
        this.ideal = ideal; this.miss = miss;
    }
    about(full_time, event_time, status) { // default status is 'excess'
        if((full_time - ideal) <= event_time && (full_time + ideal) >= event_time) {
            status = 'ideal'; return status;
        };
        if(status != 'ideal' && (full_time - ideal - miss) <= event_time && (full_time + ideal + miss) >= event_time) {
            status = 'miss'; return status;
        }
    }
}
//
// scenario composer

//
// drawing process
setInterval(draw, 1000/60)
function draw() {
    if(old_perf) {
        mspf = Math.floor(performance.now() - old_perf);
    };
    ctx.fillStyle = "#555555"; ctx.fillRect(0, 0, 512, 512);
    global_time = Math.floor(performance.now()/10);
    old_perf = performance.now();
    ctx.fillStyle = "#99ff99"; ctx.font = "12px Helvetica"
    ctx.fillText(`full_perf: ${global_time}`, 2, 495);
    ctx.fillText(`mSPF: ${mspf}`, 2, 480);
    ctx.fillText(`life for: ${Math.floor(global_time/6000)} minutes, ${
        Math.floor(global_time/100) - (Math.floor(global_time/6000)*60)} seconds and ${
        global_time - (Math.floor(global_time/100) - (Math.floor(global_time/6000)*60))*100 - Math.floor(
            global_time/6000)*6000} ticks.`, 2, 510);
    
    if(gameact) {
        if(!start_at) {start_at = global_time};
        game_time = global_time - start_at;
        if(game_time >= game_duration*100) {gameact = false; start_at = 0; console.log("game finished!")}
    };

    ctx.fillText(`SAT: ${start_at}, AGT: ${game_time} of ${game_duration*100}.`, 2, 465);
    ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, 512, 32);
    ctx.fillStyle = "#002200";
    ctx.fillRect(0, 0, ((game_time/(game_duration*100))*512), 32);
    ctx.fillStyle = "#44ff44";
    ctx.fillRect(((game_time/(game_duration*100))*512), 0, 1, 32);
};
