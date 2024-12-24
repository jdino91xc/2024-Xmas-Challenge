// Song data
const songs = [
    { code: 'Up', name: 'Up on the House Top', artist: 'Gene Autry', year: 1947, order: 1 },
    { code: 'Up', name: 'Up on the Roof', artist: 'The Drifters', year: 1964, order: 2 },
    { code: 'Down', name: 'Down by the River', artist: 'Neil Young', year: 1969, order: 3 },
    { code: 'Down', name: 'Down on the Corner', artist: 'CCR', year: 1969, order: 4 },
    { code: 'Left', name: 'Left in the Dark', artist: 'Barbra Streisand', year: 1984, order: 5 },
    { code: 'Right', name: 'Fight for Your Right', artist: 'Beastie Boys', year: 1986, order: 6 },
    { code: 'Left', name: 'She Left Me on Friday', artist: 'Shed Seven', year: 1999, order: 7 },
    { code: 'Right', name: 'Everything in its Right Place', artist: 'Radiohead', year: 2000, order: 8 },
    { code: 'B', name: 'B&E', artist: 'Nothing', year: 2012, order: 9 },
    { code: 'A', name: 'A Sky Full of Stars', artist: 'Coldplay', year: 2014, order: 10 },
    { code: 'Start', name: 'Start the Healing', artist: 'Korn', year: 2021, order: 11 },
    { code: 'Not part of code', name: 'Party All the Time', artist: 'Eddie Murphy', year: 1985, order: null },
    // Additional songs
];

// Shuffle songs for random order
const shuffledSongs = songs.sort(() => Math.random() - 0.5);

// Render songs in two initial columns
const initialSongsLeft = document.getElementById('initial-songs-left');
const initialSongsRight = document.getElementById('initial-songs-right');
shuffledSongs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.className = 'song';
    songElement.draggable = true;
    songElement.dataset.order = song.order;
    songElement.textContent = `${song.name} - ${song.artist} (${song.year})`;
    if (index % 2 === 0) {
        initialSongsLeft.appendChild(songElement);
    } else {
        initialSongsRight.appendChild(songElement);
    }
});

// Create target slots
const dropArea = document.getElementById('drop-area');
for (let i = 1; i <= 11; i++) {
    const slot = document.createElement('div');
    slot.className = 'target-slot';
    slot.dataset.targetOrder = i;
    slot.textContent = `Slot ${i}`;
    dropArea.appendChild(slot);
}

// Drag and drop logic
let draggedItem = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('song')) {
        draggedItem = e.target;
        e.target.classList.add('dragging');
    }
});

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('song')) {
        e.target.classList.remove('dragging');
    }
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
    if (e.target.classList.contains('target-slot') && !e.target.classList.contains('filled')) {
        e.target.textContent = draggedItem.textContent;
        e.target.classList.add('filled');
        e.target.dataset.filledOrder = draggedItem.dataset.order;
    }
});

// Check order
document.getElementById('checkOrder').addEventListener('click', () => {
    const slots = document.querySelectorAll('.target-slot');
    const isCorrect = Array.from(slots).every((slot, index) => {
        return parseInt(slot.dataset.filledOrder) === index + 1;
    });

    document.getElementById('result').textContent = isCorrect
        ? 'Correct! The code is 3, 1, 5.'
        : 'Incorrect order. Try again!';
});
