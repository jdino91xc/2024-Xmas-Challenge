const songs = [
    { song: 'Up on the House Top', artist: 'Gene Autry', release: 1947 },
    { song: 'Up on the Roof', artist: 'The Drifters', release: 1964 },
    { song: 'Down by the River', artist: 'Neil Young', release: 1969 },
    { song: 'Down on the Corner', artist: 'CCR', release: 1969 },
    { song: 'Left in the Dark', artist: 'Barbra Streisand', release: 1984 },
    { song: 'Fight for your Right', artist: 'Beastie Boys', release: 1986 },
    { song: 'She Left Me on Friday', artist: 'Shed Seven', release: 1999 },
    { song: 'Everything in its Right Place', artist: 'Radiohead', release: 2000 },
    { song: 'B&E', artist: 'Nothing', release: 2012 },
    { song: 'A Sky Full of Stars', artist: 'Coldplay', release: 2014 },
    { song: 'Start the Healing', artist: 'Korn', release: 2021 }
];

let shuffledSongs = shuffleArray(songs);

const initialSongsContainer = document.getElementById('initial-songs');
const dropArea = document.getElementById('drop-area');
const resultDiv = document.getElementById('result');

let dropSlots = [];

// Shuffle the songs randomly
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create song item elements for drag-and-drop
function createSongItem(song, parent) {
    const songElement = document.createElement('div');
    songElement.textContent = song.song;
    songElement.draggable = true;
    songElement.classList.add('song-item');
    songElement.addEventListener('dragstart', (event) => handleDragStart(event));
    parent.appendChild(songElement);
}

// Handle the drag start event
function handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

// Create drop slots for the user to drag items into
function createDropSlot(index) {
    const dropSlot = document.createElement('div');
    dropSlot.classList.add('drop-slot');
    dropSlot.addEventListener('dragover', handleDragOver);
    dropSlot.addEventListener('drop', (event) => handleDrop(event, dropSlot));
    return dropSlot;
}

// Allow dragging over the drop slot
function handleDragOver(event) {
    event.preventDefault();
}

// Handle dropping the song into a drop slot
function handleDrop(event, dropSlot) {
    event.preventDefault();
    const draggedSong = event.dataTransfer.getData('text');
    dropSlot.textContent = draggedSong;
}

// Set up the puzzle
function setupPuzzle() {
    shuffledSongs.forEach((song) => {
        createSongItem(song, initialSongsContainer);
    });

    for (let i = 1; i <= 11; i++) {
        const dropSlot = createDropSlot(i);
        dropSlots.push(dropSlot);
        dropArea.appendChild(dropSlot);
    }
}

// Check the order of the songs
function checkOrder() {
    const orderedSongs = Array.from(dropArea.children).map(slot => slot.textContent);
    const correctOrder = [
        'Up on the House Top', 'Up on the Roof', 'Down by the River',
        'Down on the Corner', 'Left in the Dark', 'Fight for your Right',
        'She Left Me on Friday', 'Everything in its Right Place',
        'B&E', 'A Sky Full of Stars', 'Start the Healing'
    ];

    if (orderedSongs.join(',') === correctOrder.join(',')) {
        resultDiv.textContent = '🎉 Congratulations! The code is: 3, 1, 5 🎉';
    } else {
        resultDiv.textContent = '❌ Incorrect order. Please try again! ❌';
    }
}

// Initialize the puzzle setup
setupPuzzle();
