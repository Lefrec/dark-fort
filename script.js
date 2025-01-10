//système de navigation
var room;
var currentRoom;

spawnKargunt();

function spawnKargunt() {
    new_catacomb();
}

//génère l'entrée d'une nouvelle catacombe (pas le stuff de kargunt etc)
function new_catacomb() {
    //créer l'entrée
    currentRoom = 0;
    let entranceRoom = {
        index: 0,
        visited: true,
        explored: false,
        adjacent: [],
    }
    room = [entranceRoom];
    //roll le nombre de portes et créer les salles adjacentes
    let doorNumber = roll(4);
    for (let i = 1; i <= doorNumber; i++) {
        let newRoom = {
            index: i,
            visited: false,
            explored: false,
            adjacent: [0],
        }
        room[0].adjacent.push(i);
        room[i] = newRoom;
    }
    update_room_html();
}

function enter_room(index) {
    currentRoom = index;
    //si la room n'a jamais été visité on génère les salles adjacentes
    if (room[currentRoom].visited == false) {
        for (let i = 0; i <roll_doors(); i++){
            let newRoom = {
                index: room.length,
                visited: false,
                explored: false,
                adjacent: [index],
            }
            room[index].adjacent.push(room.length);
            room.push(newRoom);
        }
        room[currentRoom].visited = true;
    }
    update_room_html();
}

//change les quelques infos dans l'html
function update_room_html() {
    document.getElementById("room__desc").innerHTML = room[currentRoom].index;

    let doors = document.getElementById("doors");
    doors.innerHTML = "";
    for (let i = 0; i < room[currentRoom].adjacent.length; i++) {
        let roomIndex = room[currentRoom].adjacent[i];
        let door = document.createElement("button");
        door.textContent = `Enter room ${room[roomIndex].visited ? roomIndex : "?"} (${room[currentRoom].explored ? "explored" : "unexplored"})`;
        door.id = `door${roomIndex}`;
        door.onclick = () => enter_room(roomIndex);
        doors.appendChild(door);
    }
}


//___________________________librairie_personnelle___________________________

//renvoie un entier entre 1 et max
function roll(max) {
    return Math.ceil(Math.random() * (max));
}

//renvoie 0, 1 ou 2 sur un D4
function roll_doors() {
    let roll = Math.ceil(Math.random() * (4));
    if (roll == 1) return 0;
    if (roll == 2) return 1;
    if (roll == 3 || roll === 4) return 2;
}

function wait(s) {
    await 
}