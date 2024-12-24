// Array of songs with titles and years
const songs = [
    { title: "White Christmas", year: 1942 },
    { title: "Jingle Bell Rock", year: 1957 },
    { title: "Rudolph the Red-Nosed Reindeer", year: 1949 },
    { title: "Frosty the Snowman", year: 1950 },
    { title: "Silent Night", year: 1818 },
    { title: "All I Want for Christmas Is You", year: 1994 },
    { title: "The Christmas Song", year: 1946 },
    { title: "Rockin' Around the Christmas Tree", year: 1958 },
    { title: "Last Christmas", year: 1984 },
    { title: "It's the Most Wonderful Time of the Year", year: 1963 },
    { title: "Santa Baby", year: 1953 },
    { title: "Do They Know It's Christmas?", year: 1984 },
    { title: "Blue Christmas", year: 1948 },
    { title: "Wonderful Christmastime", year: 1979 },
    { title: "Happy Xmas (War Is Over)", year: 1971 },
    { title: "Grandma Got Run Over by a Reindeer", year: 1979 },
    { title: "Christmas (Baby Please Come Home)", year: 1963 },
    { title: "Holly Jolly Christmas", year: 1964 },
    { title: "Please Come Home for Christmas", year: 1960 },
    { title: "I Saw Mommy Kissing Santa Claus", year: 1952 },
];

// Randomly shuffle the songs array
const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);

// Get columns for left two columns
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");

// Populate the left two columns with shuffled songs
shuffledSongs.forEach((song, index) => {
    const column = index % 2 === 0 ? leftColumn : rightColumn;
    const songItem = document.createElement("div");
    songItem.className = "song-item";
    songItem.draggable = true;
    songItem.textContent = `${song.title} (${song.year})`; // Add year to song title
    songItem.dataset.index = index;

    // Debugging: Check what is being added
    console.log(`Adding song: ${song.title} (${song.year}) to column ${index % 2 === 0 ? "left" : "right"}`);
    
    songItem.addEventListener("dragstart", dragStart);
    column.appendChild(songItem);
});

// Populate the drop slots in the right column
const dropArea = document.getElementById("drop-area");
songs.forEach(() => {
    const dropSlot = document.createElement("div");
    dropSlot.className = "drop-slot";
    dropSlot.addEventListener("dragover", dragOver);
    dropSlot.addEventListener("drop", drop);
    dropArea.appendChild(dropSlot);
});

// Drag-and-drop functionality
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData("text", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const target = event.target;
    if (target.className.includes("drop-slot")) {
        target.textContent = draggedItem.textContent;
        target.dataset.index = draggedItem.dataset.index;
    }
}

// Check the order
document.getElementById("check-order").addEventListener("click", () => {
    const dropSlots = document.querySelectorAll(".drop-slot");
    const isCorrect = [...dropSlots].every(
        (slot, index) => slot.dataset.index == index
    );

    const result = document.getElementById("result");
    if (isCorrect) {
        result.textContent = "Correct! The code is 3, 1, 5.";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. Try again!";
        result.style.color = "red";
    }
});
