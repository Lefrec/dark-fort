var room;
var currentRoom;

new_catacomb();

//génère l'entrée d'une nouvelle catacombe (pas le stuff de kargunt etc)
function new_catacomb() {
    //créer l'entrée
    currentRoom = 0;
    let entranceRoom = {
        index: 0,
        explored: false,
        adjacent: [],
    }
    room = [entranceRoom];
    //roll le nombre de portes et créer les salles adjacentes
    let doorNumber = roll(4);
    for (let i = 1; i <= doorNumber; i++) {
        let newRoom = {
            index: i,
            explored: false,
            adjacent: [0],
        }
        room[0].adjacent.push(i);
        room[i] = newRoom;
    }
    update_doors();
    update_html();
}

function enter_room(index) {
    currentRoom = index;
    for (let i = 0; i <roll_doors(); i++){
        let newRoom = {
            index: room.length,
            explored: false,
            adjacent: [index],
        }
        room[index].adjacent.push(room.length);
        room.push(newRoom);
    }
    update_doors();
    update_html();
}

//créer les boutons qui mène aux salles adjacentes
function update_doors() {
    let doorContainer = document.getElementById("doors_buttons_container");
    doorContainer.innerHTML = "";
    for (let i = 0; i < room[currentRoom].adjacent.length; i++) {
        let roomIndex = room[currentRoom].adjacent[i];
        let door = document.createElement("button");
        door.textContent = `Enter room ${roomIndex} (${room[currentRoom].explored ? "explored" : "unexplored"})`;
        door.id = `door${roomIndex}`;
        door.onclick = () => enter_room(roomIndex);
        doorContainer.appendChild(door);
    }
}

//change les quelques infos dans l'html
function update_html() {
    document.getElementById("current_room").textContent = room[currentRoom].index;
    document.getElementById("is_it_explored").textContent = room[currentRoom].explored;
    document.getElementById("adjacent_rooms").textContent = room[currentRoom].adjacent;
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