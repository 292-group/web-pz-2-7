var time;
var timer;

$(document).ready(function(){
    var sequence = [];
    var arr = randomUniqueNum(25, 25);
    console.log(arr);
    $(".cell").css("background-color", randomHex);
    var number = $(".cell p");
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
    var arr = []
    for (var i = 1; i <= range; i++) {
      arr.push(i)
    }
    var result = [];
    for (var i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
    return result;
}
function insertData(win){
  var best = 10000;
  if(win){
    var gameCounter = localStorage.length+1;
    localStorage.setItem("Game"+gameCounter, time);
  }

  for(var i=0; i<localStorage.length; i++) {
    var key = localStorage.key(i);
    if(parseFloat(localStorage.getItem(key))<best)
    best = parseFloat(localStorage.getItem(key));
  }
  for(var i=0; i<localStorage.length; i++) {
    var key = localStorage.key(i);
    if(parseFloat(localStorage.getItem(key))==best){
      var item = localStorage.getItem(key)
      $('.podium').append('<tr class="best"><td>'+key+'</td>'+item+'<td></td></tr>');
      $(".best td").css("color", "orange");
    }else{
      $('.podium').append('<tr><td>'+key+'</td>'+item+'<td></td></tr>');
    }
  }
  console.log(localStorage);
}
