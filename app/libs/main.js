let time;
let timer;

$(document).ready(function(){
    let sequence = [];
    let arr = randomUniqueNum(25, 25);
    console.log(arr);
    $(".cell").css("background-color", randomHex);
    let number = $(".cell p");
    for(i=0; i<25;i++){
        number[i].textContent = arr[i];
    }
    $('.cell').on('click', function() {
        sequence.push(parseFloat($(this).text()));
        console.log(sequence);
        $(this).hide();
        if(sequence[0]!=1){
          $(".game__popup p").text("You loose!");
          window.clearInterval(timer);
          showpopup();
        }
        if(sequence[sequence.length-2]+1!=sequence[sequence.length-1] && sequence.length>1){
          $(".game__popup p").text("You loose!");
          window.clearInterval(timer);
          showpopup();
          
        }
        if(sequence.length == 25){
          $(".game__popup p").text("You win!");
          window.clearInterval(timer);
          showpopup();
        }
    });

    
});
function startGame(){
  $(".main-menu").css("display", "none");
  $(".game").css("display", "flex");
  time = 1;
  timer = window.setInterval(myTimer, 1000);
}
function refresh(){
  document.location.reload();
}
function showpopup()
{
 $(".game__popup").css({"visibility":"visible","display":"flex"});
}
function hidepopup()
{
 $(".game__popup").css({"visibility":"hidden","display":"flex"});
}
function showResult(){
  //localStorage.setItem('Game', 1);
 

    hidepopup();
    $(".results").css({"display":"flex"});
    $(".game").css({"display":"none"});
    if($(".game__popup__text").text()=="You win!")
    insertData(true);
    else
    insertData(false);
}
function myTimer() {
    $(".game__timer").text("Time: "+time+++" seconds");
  }
function randomHex() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}
function randomUniqueNum(range, outputCount) {
    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }
    let result = [];
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
    return result;
}
function insertData(win){
  let best = 10000;
  if(win){
    let gameCounter = localStorage.length+1;
    localStorage.setItem("Game"+gameCounter, time);
  }
  
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    if(parseFloat(localStorage.getItem(key))<best)
    best = parseFloat(localStorage.getItem(key));
  }
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    if(parseFloat(localStorage.getItem(key))==best){
      $('.podium').append(`<tr class="best"><td>${key}</td><td>${localStorage.getItem(key)}</td></tr>`);
      $(".best td").css("color", "orange");
    }else{
      $('.podium').append(`<tr><td>${key}</td><td>${localStorage.getItem(key)}</td></tr>`);
    }
  }
  console.log(localStorage);
}