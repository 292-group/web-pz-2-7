function startGame(){$(".main-menu").css("display","none"),$(".game").css("display","flex"),time=1,timer=window.setInterval(myTimer,1e3)}function refresh(){document.location.reload()}function showpopup(){$(".game__popup").css({visibility:"visible",display:"flex"})}function hidepopup(){$(".game__popup").css({visibility:"hidden",display:"flex"})}function showResult(){hidepopup(),$(".results").css({display:"flex"}),$(".game").css({display:"none"}),insertData("You win!"==$(".game__popup__text").text()?!0:!1)}function myTimer(){$(".game__timer").text("Time: "+time+++" seconds")}function randomHex(){return"#"+Math.floor(16777215*Math.random()).toString(16)}function randomUniqueNum(e,t){for(var o=[],a=1;a<=e;a++)o.push(a);for(var l=[],a=1;a<=t;a++){const r=Math.floor(Math.random()*(e-a));l.push(o[r]),o[r]=o[e-a]}return l}function insertData(e){var t=1e4;if(e){var o=localStorage.length+1;localStorage.setItem("Game"+o,time)}for(var a=0;a<localStorage.length;a++){var l=localStorage.key(a);parseFloat(localStorage.getItem(l))<t&&(t=parseFloat(localStorage.getItem(l)))}for(var a=0;a<localStorage.length;a++){var l=localStorage.key(a);if(parseFloat(localStorage.getItem(l))==t){var r=localStorage.getItem(l);$(".podium").append('<tr class="best"><td>'+l+"</td>"+r+"<td></td></tr>"),$(".best td").css("color","orange")}else $(".podium").append("<tr><td>"+l+"</td>"+r+"<td></td></tr>")}console.log(localStorage)}var time,timer;$(document).ready(function(){var e=[],t=randomUniqueNum(25,25);console.log(t),$(".cell").css("background-color",randomHex);var o=$(".cell p");for(i=0;i<25;i++)o[i].textContent=t[i];$(".cell").on("click",function(){e.push(parseFloat($(this).text())),console.log(e),$(this).hide(),1!=e[0]&&($(".game__popup p").text("You loose!"),window.clearInterval(timer),showpopup()),e[e.length-2]+1!=e[e.length-1]&&e.length>1&&($(".game__popup p").text("You loose!"),window.clearInterval(timer),showpopup()),25==e.length&&($(".game__popup p").text("You win!"),window.clearInterval(timer),showpopup())})});