// Songs array
const songs = [
    { id: 1, name: "Up on the House Top", artist: "Gene Autry" },
    { id: 2, name: "Up on the Roof", artist: "The Drifters" },
    { id: 3, name: "Down by the River", artist: "Neil Young" },
    { id: 4, name: "Down on the Corner", artist: "CCR" },
    { id: 5, name: "Left in the Dark", artist: "Barbra Streisand" },
    { id: 6, name: "Fight for your Right", artist: "Beastie Boys" },
    { id: 7, name: "She Left Me on Friday", artist: "Shed Seven" },
    { id: 8, name: "Everything in its Right Place", artist: "Radiohead" },
    { id: 9, name: "B&E", artist: "Nothing" },
    { id: 10, name: "A Sky Full of Stars", artist: "Coldplay" },
    { id: 11, name: "Start the Healing", artist: "Korn" },
    { id: 12, name: "Party All the Time", artist: "Eddie Murphy" },
    { id: 13, name: "Sheep Go to Heaven", artist: "Cake" },
    { id: 14, name: "The World's Biggest Paving Slab", artist: "English Teacher" },
    { id: 15, name: "Deeper Underground", artist: "Jamiroquai" },
    { id: 16, name: "Float On", artist: "Modest Mouse" },
    { id: 17, name: "The Middle", artist: "Jimmy Eat World" },
    { id: 18, name: "Overkill", artist: "Men at Work" },
    { id: 19, name: "Jesus Just Left Chicago", artist: "ZZ Top" },
    { id: 20, name: "Sleigh Ride", artist: "Ella Fitzgerald" }
];

// Correct order by song ID
const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Shuffle songs and distribute to columns
const shuffledSongs = [...songs].sort(() => 0.5 - Math.random());
const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');

shuffledSongs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    songItem.draggable = true;
    songItem.textContent = `${song.name} - ${song.artist}`;
    songItem.dataset.id = song.id;
    songItem.addEventListener('dragstart', dragStart);
    if (index < 10) column1.appendChild(songItem);
    else column2.appendChild(songItem);
});

// Populate drop area with empty slots
const dropArea = document.getElementById('dropArea');
for (let i = 0; i < correctOrder.length; i++) {
    const dropSlot = document.createElement('div');
    dropSlot.classList.add('drop-slot');
    dropSlot.dataset.slot = i + 1;
    dropSlot.addEventListener('dragover', dragOver);
    dropSlot.addEventListener('drop', dropSong);
    dropArea.appendChild(dropSlot);
}

// Drag and drop functionality
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function dropSong(event) {
    if (draggedItem) {
        event.target.textContent = draggedItem.textContent;
        event.target.dataset.id = draggedItem.dataset.id;
    }
}

// Check the order
function checkOrder() {
    const userOrder = Array.from(dropArea.children).map(slot => slot.dataset.id);
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder.map(String))) {
        document.getElementById('result').textContent = "Correct! The code is 3, 1, 5.";
    } else {
        document.getElementById('result').textContent = "Incorrect. Try again!";
    }
}
