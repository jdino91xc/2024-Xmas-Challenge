const songs = [
    "Up on the House Top - Gene Autry",
    "Up on the Roof - The Drifters",
    "Down by the River - Neil Young",
    "Down on the Corner - CCR",
    "Left in the Dark - Barbra Streisand",
    "Fight for your Right - Beastie Boys",
    "She Left Me on Friday - Shed Seven",
    "Everything in its Right Place - Radiohead",
    "B&E - Nothing",
    "A Sky Full of Stars - Coldplay",
    "Start the Healing - Korn",
    "Party All the Time - Eddie Murphy",
    "Sheep Go to Heaven - Cake",
    "The World's Biggest Paving Slab - English Teacher",
    "Deeper Underground - Jamiroquai",
    "Float On - Modest Mouse",
    "The Middle - Jimmy Eat World",
    "Overkill - Men at Work",
    "Jesus Just Left Chicago - ZZ Top",
    "Sleigh Ride - Ella Fitzgerald"
];

const correctOrder = [
    "Up on the House Top - Gene Autry",
    "Up on the Roof - The Drifters",
    "Down by the River - Neil Young",
    "Down on the Corner - CCR",
    "Left in the Dark - Barbra Streisand",
    "Fight for your Right - Beastie Boys",
    "She Left Me on Friday - Shed Seven",
    "Everything in its Right Place - Radiohead",
    "B&E - Nothing",
    "A Sky Full of Stars - Coldplay",
    "Start the Healing - Korn"
];

// Shuffle songs for display in columns
const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);

// Populate two columns with shuffled songs
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");

shuffledSongs.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.className = "song-item";
    songDiv.draggable = true;
    songDiv.textContent = song;

    songDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", song);
    });

    if (index % 2 === 0) {
        column1.appendChild(songDiv);
    } else {
        column2.appendChild(songDiv);
    }
});

// Populate the drop area with empty slots
const dropArea = document.getElementById("dropArea");

for (let i = 0; i < correctOrder.length; i++) {
    const slot = document.createElement("div");
    slot.className = "drop-slot";
    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        slot.textContent = data;
        slot.classList.add("filled");
    });
    dropArea.appendChild(slot);
}

// Check the order of dropped songs
function checkOrder() {
    const droppedSongs = Array.from(dropArea.children).map((slot) => slot.textContent.trim());
    if (JSON.stringify(droppedSongs) === JSON.stringify(correctOrder)) {
        document.getElementById("result").textContent = "Correct! The code is 3, 1, 5.";
    } else {
        document.getElementById("result").textContent = "Incorrect order. Try again.";
    }
}
