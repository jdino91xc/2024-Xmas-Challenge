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
    { code: 'Not part of code', name: 'Sheep Go to Heaven', artist: 'Cake', year: 1998, order: null },
    { code: 'Not part of code', name: 'The World\'s Biggest Paving Slab', artist: 'English Teacher', year: 2024, order: null },
    { code: 'Not part of code', name: 'Deeper Underground', artist: 'Jamiroquai', year: 1998, order: null },
    { code: 'Not part of code', name: 'Float On', artist: 'Modest Mouse', year: 2004, order: null },
    { code: 'Not part of code', name: 'The Middle', artist: 'Jimmy Eat World', year: 2001, order: null },
    { code: 'Not part of code', name: 'Overkill', artist: 'Men at Work', year: 1983, order: null },
    { code: 'Not part of code', name: 'Jesus Just Left Chicago', artist: 'ZZ Top', year: 1973, order: null },
    { code: 'Not part of code', name: 'Sleigh Ride', artist: 'Ella Fitzgerald', year: 1960, order: null }
];

// Shuffle songs for random order
const shuffledSongs = songs.sort(() => Math.random() - 0.5);

// Divide songs into two columns
const leftColumn = shuffledSongs.slice(0, Math.ceil(shuffledSongs.length / 2));
const rightColumn = shuffledSongs.slice(Math.ceil(shuffledSongs.length / 2));

// Render songs in columns
const initialSongsLeft = document.getElementById('initial-songs-left');
const initialSongsRight = document.getElementById('initial-songs-right');

[leftColumn, rightColumn].forEach((column, index) => {
    const target = index === 0 ? initialSongsLeft : initialSongsRight;
    column.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'song';
        songElement.draggable = true;
        songElement.dataset.order = song.order;
        songElement.textContent = `${song.name} - ${song.artist} (${song.year})`;
        target.appendChild(songElement);
    });
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
