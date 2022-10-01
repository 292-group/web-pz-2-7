$('.second_screen').hide();
$('.third_screen').hide();
let block,tableElement,resultTimeArr=[],randomArr=[],check=1,seconds =60,isCheckMistake=true;
let time=document.querySelector('.time');
let num=document.querySelector(`.c${check}`);

//click on button 'Почати гру'
document.querySelector('.start_game').onclick=()=>{
    $('.first_screen').hide();
    $('.second_screen').show();
    //timer
    let timer = setInterval(tick,1000);
    function tick(){
    time.innerHTML=(`${--seconds}`)
    if(seconds==0){
        clearTimeout(timer);
        alert('Час вийшов :(');
        location.reload()
    }
    else if(!isCheckMistake) clearTimeout(timer);
    }
}

//cecle for build random array
function severalRandom(min, max, num) {
    let i, arr = [], res = [];
    for (i = min; i <= max; i++ ) arr.push(i);
    for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
    return res;
}
randomArr=severalRandom(1,25,25);

// cecle for build game field 
for(let i=0;i<25;i++){
    if(i===0||i%5===0){
    block=document.createElement('tr');
    let a=i;
    block.innerHTML=(
        `<td class='c${randomArr[a]} td'>${randomArr[a++]}</td>
        <td class='c${randomArr[a]} td'>${randomArr[a++]}</td>
        <td class='c${randomArr[a]} td'>${randomArr[a++]}</td>
        <td class='c${randomArr[a]} td'>${randomArr[a++]}</td>
        <td class='c${randomArr[a]} td'>${randomArr[a]}</td>`)
        a=0;
        document.querySelector('.game_field').appendChild(block);
    }
}

document.querySelector('.game_field').onclick=(event)=>{
    if(event.target.classList.contains(`c${check}`)){
        console.log(`click on ${check}`);
        document.querySelector(`.c${check}`).classList.add('gray_bg');
        
        if(check==25){
            isCheckMistake=false;
            alert('Вітаю, ви виграли!!!');
            $('.second_screen').hide();
            $('.third_screen').show();
            //operations in localStorage
            resultTimeArr.push.apply(resultTimeArr, JSON.parse((localStorage.getItem('resultTimeArr'))));
            resultTimeArr.push(time.textContent);
            localStorage.setItem('resultTimeArr',JSON.stringify(resultTimeArr));

            //cecle for table result
            for(let i=0;i<resultTimeArr.length;i++){
                tableElement=document.createElement('tr');
                if(resultTimeArr[i]==Math.max.apply(null,resultTimeArr)) tableElement.className='min_time_bg';
                else if(i%2==0) tableElement.className='darker_bg';
                else if(i%2!=0) tableElement.className='whiter_bg';
                tableElement.innerHTML=(` <td>Гра ${++i}</td> <td>${60-resultTimeArr[--i]}с.</td>`)
                document.querySelector('.table_result').appendChild(tableElement);
            } 
        }
        check++;
    }
    else{
        alert('Невірна цифра');
        isCheckMistake=false;
        location.reload();
    }
}

// click on button restart
document.querySelector('.btn_restart').onclick=()=> location.reload();
document.querySelector('.btn').onclick=()=> location.reload();

