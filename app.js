let gameObj = {
    ships:{
        "small_ship":{
            parts:["small_ship_back_0","small_ship_front_0"],
            length:2
        },
        "gun_boat":{
            parts:["gun_boat_back_0","gun_boat_mid_0","gun_boat_front_0"],
            length:3
        },
        "clipper":{
            parts:["clipper_back_0","clipper_mid_0","clipper_front_0"],
            length:3
        },
        "battleship":{
            parts:["battleship_back_0","battleship_mid_0","battleship_mid_1","battleship_front_0"],
            length:4
        },
        "carrier":{
            parts:["carrier_back_0","carrier_mid_0","carrier_mid_1","carrier_mid_2","carrier_front_0"],
            length:5
        }
    }
}
var cursorPos;

var enemyBoard = {
    "ships": {
        "small_ship": {
            parts:{
                "small_ship_back_0":[0,0],
                "small_ship_front_0":[0,0]
            },
            length:2
        },
        "gun_boat": {
            parts:{
                "gun_boat_back_0":[0,0],
                "gun_boat_mid_0":[0,0],
                "gun_boat_front_0":[0,0]
            },
            length:3
        },
        "clipper": {
            parts:{
                "clipper_back_0":[0,0],
                "clipper_mid_0":[0,0],
                "clipper_front_0":[0,0]
            },
            length:3
        },
        "battleship": {
            parts:{
                "battleship_back_0":[0,0],
                "battleship_mid_0":[0,0],
                "battleship_mid_1":[0,0],
                "battleship_front_0":[0,0]
            },
            length:4
        },
        "carrier": {
            parts:{
                "carrier_back_0":[0,0],
                "carrier_mid_0":[0,0],
                "carrier_mid_1":[0,0],
                "carrier_mid_2":[0,0],
                "carrier_front_0":[0,0]
            },
            length:5
        }
    },
    quickCoords:[],
    matrix:[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
}
function startGame(){

$(".available").on("click",(event)=>{
    let shipName = $(event.currentTarget).attr("ship")
    $(event.currentTarget).addClass("selectedShip")
    $(".cell").on("click",(ev)=>{
        anchorShip(shipName, ev.currentTarget)
    })
})

$("body").on("click",(event)=>{
    if($(event.target).attr("class").indexOf(" ghost ") !== -1 && $(".badGhost").length == 0 && $(".ghost").length == gameObj.ships[$(".selectedShip").attr("ship")].length){
        placeShip($(".selectedShip").attr("ship"));
    }
})

}
startGame()

function selectShip(){
    
}

function anchorShip(ship, target){
    let x = parseInt($(target).parent().attr("id").replaceAll("row",""))
    let y = parseInt($(target).attr("id").replaceAll("col",""))
    $(target).append($("<img/>").addClass("anchor").attr("src",`Assets/${ship}_back_0.png`))
    $("body").on("mousemove",(event)=>{
        if(event.originalEvent.clientX < target.offsetLeft && event.originalEvent.clientY > target.offsetTop && event.originalEvent.clientY < (target.offsetTop + 80) && cursorPos !== 'left'){
            $(".ghost").removeClass("ghost")
            $(".badGhost").removeClass("badGhost")
            $(".frontGhost").removeClass("frontGhost")
            cursorPos = 'left'
            //Cursor Left
            $(".anchor").css("transform",`rotate(180deg)`)
            //Find the front cell
            for(let i = 0; i < gameObj.ships[ship].length; i++){
                if($(`#row${x}`).children(`#col${y - i}`).children().length == 0 || i == 0){
                $(`#row${x}`).children(`#col${y - i}`).addClass("ghost")
                }else{
                $(`#row${x}`).children(`#col${y - i}`).addClass("badGhost")
                }
                if(i == gameObj.ships[ship].length - 1){
                $(`#row${x}`).children(`#col${y - i}`).addClass("frontGhost")
            }
            }
        }else if(event.originalEvent.clientY < target.offsetTop && event.originalEvent.clientX > target.offsetLeft && event.originalEvent.clientX < (target.offsetLeft + 80) && cursorPos !== 'top'){
            $(".ghost").removeClass("ghost")
            $(".badGhost").removeClass("badGhost")
            $(".frontGhost").removeClass("frontGhost")
            cursorPos = 'top'
            //Cursor Top
            $(".anchor").css("transform",`rotate(270deg)`)
            //Find the front cell
            for(let i = 0; i < gameObj.ships[ship].length; i++){
                if($($(`#row${x - i}`).children(`#col${y}`)).children().length == 0 || i == 0){
                $(`#row${x - i}`).children(`#col${y}`).addClass("ghost")
                }else{
                $(`#row${x - i}`).children(`#col${y}`).addClass("badGhost")
                }
                if(i == gameObj.ships[ship].length - 1){
                    $(`#row${x - i}`).children(`#col${y}`).addClass("frontGhost")
            }
            }
        }else if(event.originalEvent.clientX > (target.offsetLeft + 80) && event.originalEvent.clientY < (target.offsetTop + 80) && event.originalEvent.clientY > target.offsetTop && cursorPos !== 'right'){
            $(".ghost").removeClass("ghost")
            $(".badGhost").removeClass("badGhost")
            $(".frontGhost").removeClass("frontGhost")
            cursorPos = 'right'
            //Cursor Right
            $(".anchor").css("transform",`rotate(0deg)`)
            //Find the front cell
            for(let i = 0; i < gameObj.ships[ship].length; i++){
                if($(`#row${x}`).children(`#col${y + i}`).children().length == 0 || i == 0){
                $(`#row${x}`).children(`#col${y + i}`).addClass("ghost")
                }else{
                $(`#row${x}`).children(`#col${y + i}`).addClass("badGhost")
                }
                if(i == gameObj.ships[ship].length - 1){
                    $(`#row${x}`).children(`#col${y + i}`).addClass("frontGhost")
            }
            }
        }else if(event.originalEvent.clientY > (target.offsetTop + 80) && event.originalEvent.clientX > target.offsetLeft && event.originalEvent.clientX < (target.offsetLeft + 80) && cursorPos !== 'bottom' ){
            $(".ghost").removeClass("ghost")
            $(".badGhost").removeClass("badGhost")
            $(".frontGhost").removeClass("frontGhost")
            cursorPos = 'bottom'
            //Cursor Bottom
            $(".anchor").css("transform",`rotate(90deg)`)
            //Find the front cell
            for(let i = 0; i < gameObj.ships[ship].length; i++){
                if($($(`#row${x + i}`).children(`#col${y}`)).children().length == 0 || i == 0){
                $(`#row${x + i}`).children(`#col${y}`).addClass("ghost")
                }else{
                $(`#row${x + i}`).children(`#col${y}`).addClass("badGhost")
                }
                if(i == gameObj.ships[ship].length - 1){
                    $(`#row${x + i}`).children(`#col${y}`).addClass("frontGhost")
            }
            }
        }
    })

    $(".cell").off("click")
}

function placeShip(shipName){
    console.log($(".anchor"), $(".frontGhost"))
    let dir;
    if($(".anchor").parent().attr("id") == $(".frontGhost").attr("id")){
        let num1 = parseInt($(".anchor").parent().parent().attr("id").replaceAll("row",""));
        let num2 = parseInt($(".frontGhost").parent().attr("id").replaceAll("row",""))
        console.log(num1, num2)
        if(num1 < num2){
            dir = 'down'
        }else{
            dir = 'up'
        }
    }else{
        let num1 = parseInt($(".anchor").parent().attr("id").replaceAll("col",""))
        let num2 = parseInt($(".frontGhost").attr("id").replaceAll("col",""))
        if(num1 > num2){
            dir = 'left'
        }else{
            dir = 'right'
        }
    }
    console.log(dir)
    if(dir == 'left'){
        let y = parseInt($(".frontGhost").parent().attr("id").replaceAll("row",""))
        let anchorX = parseInt($(".anchor").parent().attr("id").replaceAll("col",""))
        let frontX = parseInt($(".frontGhost").attr("id").replaceAll("col",""))
        let counter = 0;
        console.log(anchorX, frontX)
        $(".anchor").parent().empty();
        for(let i = anchorX; i > frontX - 1; i--){
            $(`.yourBoard .row[id='row${y}']`).children(`.cell[id='col${i}']`).append($("<img>").css('transform','rotate(180deg)').attr("src",`Assets/${gameObj.ships[shipName].parts[counter]}.png`))
            counter++
        }
    }else if(dir == 'right'){
        let y = parseInt($(".frontGhost").parent().attr("id").replaceAll("row",""))
        let anchorX = parseInt($(".anchor").parent().attr("id").replaceAll("col",""))
        let frontX = parseInt($(".frontGhost").attr("id").replaceAll("col",""))
        let counter = 0;
        console.log(anchorX, frontX)
        $(".anchor").parent().empty();
        for(let i = anchorX; i < frontX + 1; i++){
            console.log($(`.yourBoard .row[id='row${y}']`).children(`.cell[id='col${i}']`))
            $(`.yourBoard .row[id='row${y}']`).children(`.cell[id='col${i}']`).append($("<img>").css('transform','rotate(0deg)').attr("src",`Assets/${gameObj.ships[shipName].parts[counter]}.png`))
            counter++
        }
    }else if(dir == 'up'){
        let x = parseInt($(".frontGhost").attr("id").replaceAll("col",""))
        let anchorY = parseInt($(".anchor").parent().parent().attr("id").replaceAll("row",""))
        let frontY = parseInt($(".frontGhost").parent().attr("id").replaceAll("row",""))
        let counter = 0;
        console.log(anchorY, frontY)
        $(".anchor").parent().empty();
        for(let i = anchorY; i > frontY - 1; i--){
            console.log($(`.yourBoard .row[id='row${i}']`).children(`.cell[id='col${x}']`))
            $(`.yourBoard .row[id='row${i}']`).children(`.cell[id='col${x}']`).append($("<img>").css('transform','rotate(270deg)').attr("src",`Assets/${gameObj.ships[shipName].parts[counter]}.png`))
            counter++
        }
    }else if(dir == 'down'){
        let x = parseInt($(".frontGhost").attr("id").replaceAll("col",""))
        let anchorY = parseInt($(".anchor").parent().parent().attr("id").replaceAll("row",""))
        let frontY = parseInt($(".frontGhost").parent().attr("id").replaceAll("row",""))
        let counter = 0;
        console.log(anchorY, frontY)
        $(".anchor").parent().empty();
        for(let i = anchorY; i < frontY + 1; i++){
            console.log($(`.yourBoard .row[id='row${i}']`).children(`.cell[id='col${x}']`))
            $(`.yourBoard .row[id='row${i}']`).children(`.cell[id='col${x}']`).append($("<img>").css('transform','rotate(90deg)').attr("src",`Assets/${gameObj.ships[shipName].parts[counter]}.png`))
            counter++
        }
    }
    $("body").off("mousemove")
    $(".ghost").removeClass("ghost")
    $(".badGhost").removeClass("badGhost")
    $(".frontGhost").removeClass("frontGhost")
    $(".selectedShip").removeClass("available").removeClass("selectedShip").off("click").addClass("unavailable")

    if($(".available").length == 0){
        enemySetup();
    }
}

function enemySetup(){
    let shipNames = Object.keys(gameObj.ships);
    for(let i = 0; i < shipNames.length; i++){
            let anchorX = Math.floor(Math.random()*10)
            let anchorY = Math.floor(Math.random()*10)
            let dir = ['left','up','down','right'][Math.floor(Math.random()*4)]
            let frontX;
            let frontY;
            if(dir == 'left'){
                frontX = anchorX - enemyBoard.ships[shipNames[i]].length;
                frontY = anchorY;
            }else if(dir == 'up'){
                frontX = anchorX;
                frontY = anchorY - enemyBoard.ships[shipNames[i]].length;
            }else if (dir == 'down'){
                frontX = anchorX;
                frontY = anchorY + enemyBoard.ships[shipNames[i]].length;
            }else{
                frontX = anchorX + enemyBoard.ships[shipNames[i]].length;
                frontY = anchorY;
            }
            if(frontX > -1 && frontY > -1 && frontX < 11 && frontY < 11){
                console.log([anchorX, anchorY],[frontX, frontY], dir)
                let partCounter = 0
                if(dir == 'left'){
                    for(let g = anchorX; g > frontX; g--){
                        console.log(enemyBoard.matrix[anchorY][g])
                        if(enemyBoard.matrix[anchorY][g] == 0){
                           let part = Object.keys(enemyBoard.ships[shipNames[i]].parts)[partCounter]
                            //Have the part name. Have to set the part coords here
                           enemyBoard.matrix[anchorY][g] = 1
                           partCounter += 1
                        }else{
                            i-=1
                            break;
                        }
                    }
                }else if(dir == 'up'){
                    for(let g = anchorY; g > frontY; g--){
                        console.log(enemyBoard.matrix[g][anchorX])
                        if(enemyBoard.matrix[g][anchorX] == 0){
                           let part = Object.keys(enemyBoard.ships[shipNames[i]].parts)[partCounter]
                           enemyBoard.matrix[g][anchorX] = 1
                            partCounter += 1
                        }else{
                            i-=1
                            break;
                        }
                    }
                }else if (dir == 'down'){
                    for(let g = anchorY; g < frontY; g++){
                        console.log(enemyBoard.matrix[g][anchorX])
                        if(enemyBoard.matrix[g][anchorX] == 0){
                           let part = Object.keys(enemyBoard.ships[shipNames[i]].parts)[partCounter]
                           enemyBoard.matrix[g][anchorX] = 1
                            partCounter += 1
                        }else{
                            i-=1
                            break;
                        }
                    }
                }else{
                    for(let g = anchorX; g < frontX; g++){
                        console.log(enemyBoard.matrix[anchorY][g])
                        if(enemyBoard.matrix[anchorY][g] == 0){
                           let part = Object.keys(enemyBoard.ships[shipNames[i]].parts)[partCounter]
                           enemyBoard.matrix[anchorY][g] = 1
                            partCounter += 1
                        }else{
                            i-=1
                            break;
                        }
                    }
                }
            }else{
                i-=1
            }
        }
        console.log(enemyBoard.matrix)
        turnTransition("Game Start - Your Turn", 'player')
    }

function turnTransition(message, nextTurn){

    //Displaying Message

    if(nextTurn == 'player'){
        playerTurn();
    }else{
        cpuTurn();
    }
}

function playerTurn(){
    $(".shotBoard .cell").on("click",(event)=>{
        let coords = getCoords(event.currentTarget)
        if(enemyBoard.matrix[coords[0] - 1][coords[1] - 1] == 1){
            $(event.currentTarget).empty().addClass("hit").append($("<div/>").addClass("hitMarker").css({"transform":`rotate(${Math.floor(Math.random()*360)}deg) translate(${Math.floor(Math.random()*10)-5}px,${Math.floor(Math.random()*10)-5}px)`})).css({"display":"flex","justify-content":"center","align-items":"center"})
        }else{
            $(event.currentTarget).empty().append($("<div/>").addClass("marker").css({"transform":`rotate(${Math.floor(Math.random()*360)}deg) translate(${Math.floor(Math.random()*10)-5}px,${Math.floor(Math.random()*10)-5}px)`})).css({"display":"flex","justify-content":"center","align-items":"center"});
        }
    })
}

function getCoords(element){
    let x = parseInt($(element).parent().attr("id").replaceAll("row",""))
    let y = parseInt($(element).attr("id").replaceAll("col",""))
    return [x,y]
}

$("body").on("keydown",(event)=>{
    if(event.key == 'p'){
        enemySetup()
    }
})

function fogOfWar(){
    for(let i = 1; i < 11; i++){
        for(let k = 0; k < 11; k++){
            $(`.shotBoard #row${i}`).children(`#col${k}`).append($("<img>").attr("src","Assets/fow.png").addClass("fow"))
        }
    }
}

fogOfWar()