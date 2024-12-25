const songs = [
    "Up on the House Top - Gene Autry (1947)",
    "Up on the Roof - The Drifters (1964)",
    "Down by the River - Neil Young (1969)",
    "Down on the Corner - CCR (1969)",
    "Left in the Dark - Barbra Streisand (1984)",
    "Fight for your Right - Beastie Boys (1986)",
    "She Left Me on Friday - Shed Seven (1999)",
    "Everything in its Right Place - Radiohead (2000)",
    "B&E - Nothing (2012)",
    "A Sky Full of Stars - Coldplay (2014)",
    "Start the Healing - Korn (2021)",
    "Party All the Time - Eddie Murphy (1985)",
    "Sheep Go to Heaven - Cake (1998)",
    "The World's Biggest Paving Slab - English Teacher (2024)",
    "Deeper Underground - Jamiroquai (1998)",
    "Float On - Modest Mouse (2004)",
    "The Middle - Jimmy Eat World (2001)",
    "Overkill - Men at Work (1983)",
    "Jesus Just Left Chicago - ZZ Top (1973)",
    "Sleigh Ride - Ella Fitzgerald (1960)"
];

const correctOrder = [
    "Up on the House Top - Gene Autry (1947)",
    "Up on the Roof - The Drifters (1964)",
    "Down by the River - Neil Young (1969)",
    "Down on the Corner - CCR (1969)",
    "Left in the Dark - Barbra Streisand (1984)",
    "Fight for your Right - Beastie Boys (1986)",
    "She Left Me on Friday - Shed Seven (1999)",
    "Everything in its Right Place - Radiohead (2000)",
    "B&E - Nothing (2012)",
    "A Sky Full of Stars - Coldplay (2014)",
    "Start the Healing - Korn (2021)"
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
