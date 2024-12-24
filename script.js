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

// Render the songs
const songsList = document.getElementById('songs-list');

songs.forEach((song) => {
    const songElement = document.createElement('div');
    songElement.className = 'song';
    songElement.draggable = true;
    songElement.dataset.order = song.order;
    songElement.textContent = `${song.name} - ${song.artist} (${song.year})`;
    songsList.appendChild(songElement);
});

// Drag-and-drop functionality
let draggedElement = null;

songsList.addEventListener('dragstart', (event) => {
    draggedElement = event.target;
    event.target.classList.add('dragging');
});

songsList.addEventListener('dragend', (event) => {
    event.target.classList.remove('dragging');
    draggedElement = null;
});

songsList.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(event.clientY);
    if (afterElement == null) {
        songsList.appendChild(draggedElement);
    } else {
        songsList.insertBefore(draggedElement, afterElement);
    }
});

function getDragAfterElement(y) {
    const draggableElements = [...songsList.querySelectorAll('.song:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Check order functionality
document.getElementById('checkOrder').addEventListener('click', () => {
    const orderedSongs = [...songsList.querySelectorAll('.song')]
        .map((song) => parseInt(song.dataset.order))
        .filter((order) => !isNaN(order)); // Only include songs with valid order numbers

    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if (JSON.stringify(orderedSongs) === JSON.stringify(correctOrder)) {
        document.getElementById('result').textContent = 'Correct! Code: 3, 1, 5';
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
    }
});
