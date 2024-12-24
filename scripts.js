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
    { song: 'Start the Healing', artist: 'Korn', release: 2021 },
    { song: 'Party All the Time', artist: 'Eddie Murphy', release: 1985 },
    { song: 'Sheep Go to Heaven', artist: 'Cake', release: 1998 },
    { song: 'The World\'s Biggest Paving Slab', artist: 'English Teacher', release: 2024 },
    { song: 'Deeper Underground', artist: 'Jamiroquai', release: 1998 },
    { song: 'Float On', artist: 'Modest Mouse', release: 2004 },
    { song: 'The Middle', artist: 'Jimmy Eat World', release: 2001 },
    { song: 'Overkill', artist: 'Men at Work', release: 1983 },
    { song: 'Jesus Just Left Chicago', artist: 'ZZ Top', release: 1973 },
    { song: 'Sleigh Ride', artist: 'Ella Fitzgerald', release: 1960 }
];

let shuffledSongs = shuffleArray(songs);

const leftColumn = document.getElementById('left-column');
const rightColumn = document.getElementById('right-column');
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
    shuffledSongs.forEach((song, index) => {
        if (index < 10) {
            createSongItem(song, leftColumn);
        } else {
            createSongItem(song, rightColumn);
        }
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
