const Display = document.getElementById("display");
let timer = null;
let starttimer = 0;
let elapstime = 0;
let isrunning = false;


function start(){

  if(!isrunning){
    
    starttimer = Date.now() - elapstime;
    timer =setInterval(Update,10);
    isrunning = true;
   
    
  }

}

function stop(){
    if(isrunning){
      clearInterval(timer);
      elapstime = Date.now()-starttimer;
      isrunning = false;
    }

}

function reset(){
  clearInterval(timer);
  starttimer = 0;
  elapstime = 0;
  isrunning =false;
  Display.textContent ="00:00:00:00"
}

function Update(){

  const currunttime = Date.now();
  elapstime = currunttime - starttimer;
  let hour = Math.floor(elapstime/(1000 * 60 * 60));
  let miniute = Math.floor((elapstime/(1000 * 60 ))% 60);
  let second = Math.floor((elapstime/1000) %60);
  let ms = Math.floor(elapstime%1000);

  hour = String(hour).padStart(2,"0");
  miniute = String(miniute).padStart(2,"0");
  second = String(second).padStart(2,"0");
  ms = String(ms).padStart(3,"0");


  Display.textContent =  `${hour}:${miniute}:${second}:${ms}`
}

