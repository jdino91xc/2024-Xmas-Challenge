const songs = [
    { song: 'Up on the House Top', artist: 'Gene Autry', year: '1947', order: 1, link: 'https://youtu.be/ISqjyIdmZQs?si=WTdA1iMiofjEwfjc' },
    { song: 'Up on the Roof', artist: 'The Drifters', year: '1964', order: 2, link: 'https://youtu.be/puM1k-S86nE?si=IpUMhrozHvwDc02T' },
    { song: 'Down by the River', artist: 'Neil Young', year: '1969', order: 3, link: 'https://youtu.be/0tb_o6CkvHY?si=RBRPR9bK4VZuDefE' },
    { song: 'Down on the Corner', artist: 'CCR', year: '1969', order: 4, link: 'https://youtu.be/vrMvblpZFq0?si=rQC61QZKmNVIAM9w' },
    { song: 'Left in the Dark', artist: 'Barbra Streisand', year: '1984', order: 5, link: 'https://youtu.be/st1bTsBQH-0?si=fJhCNUiVWcEPLFKl' },
    { song: 'Fight for your Right', artist: 'Beastie Boys', year: '1986', order: 6, link: 'https://youtu.be/eBShN8qT4lk?si=XKhHdHKVxworlrzP' },
    { song: 'She Left Me on Friday', artist: 'Shed Seven', year: '1999', order: 7, link: 'https://youtu.be/ibPJy99GI94?si=0RRlhqku8MqKjxhp' },
    { song: 'Everything in its Right Place', artist: 'Radiohead', year: '2000', order: 8, link: 'https://youtu.be/onRk0sjSgFU?si=_9BWAmfN8LfeGFJb' },
    { song: 'B&E', artist: 'Nothing', year: '2012', order: 9, link: 'https://youtu.be/3B_8c5dDIeE?si=7Lw4L3iXm8yCJGAU' },
    { song: 'A Sky Full of Stars', artist: 'Coldplay', year: '2014', order: 10, link: 'https://youtu.be/VPRjCeoBqrI?si=0r3CSGpt0yOQIJaf' },
    { song: 'Start the Healing', artist: 'Korn', year: '2021', order: 11, link: 'https://youtu.be/Aupnj1KpjCg?si=bq3KjNXL32NmFw4f' },
    { song: 'Party All the Time', artist: 'Eddie Murphy', year: '1985', order: 12, link: 'https://youtu.be/iWa-6g-TbgI?si=wxNhpvD1VVHXb4yt' },
    { song: 'Sheep Go to Heaven', artist: 'Cake', year: '1998', order: 13, link: 'https://youtu.be/eYxs4esLI_E?si=2JbF3BeK07YNeYv0' },
    { song: 'The World\'s Biggest Paving Slab', artist: 'English Teacher', year: '2024', order: 14, link: 'https://youtu.be/YNkbgumvYyA?si=Et7_QEy1-cB8lNLj' },
    { song: 'Deeper Underground', artist: 'Jamiroquai', year: '1998', order: 15, link: 'https://youtu.be/WIUAC03YMlA?si=UVEzjPQM7AfvyUo-' },
    { song: 'Float On', artist: 'Modest Mouse', year: '2004', order: 16, link: 'https://youtu.be/CTAud5O7Qqk?si=aP9pRTucMeMRb4Px' },
    { song: 'The Middle', artist: 'Jimmy Eat World', year: '2001', order: 17, link: 'https://youtu.be/oKsxPW6i3pM?si=I1rQ4OGs_7GRk08o' },
    { song: 'Overkill', artist: 'Men at Work', year: '1983', order: 18, link: 'https://youtu.be/RY7S6EgSlCI?si=el5B9ql4CWy253j7' },
    { song: 'Jesus Just Left Chicago', artist: 'ZZ Top', year: '1973', order: 19, link: 'https://youtu.be/oHCVGYBa22c?si=v2O_u2CaYx0Pgc5v' },
    { song: 'Sleigh Ride', artist: 'Ella Fitzgerald', year: '1960', order: 20, link: 'https://youtu.be/NRSvczD9840?si=cnm07SUNMBX-CDK9' },
];

let songElements = [];
let dropSlots = [];

// Randomly shuffle the songs
const shuffledSongs = [...songs];
shuffledSongs.sort(() => Math.random() - 0.5);

// Create draggable song items
function createSongItem(song, column) {
    const songElement = document.createElement('div');
    songElement.classList.add('song');
    songElement.textContent = `${song.song} - ${song.artist}`;
    songElement.setAttribute('draggable', 'true');
    songElement.dataset.songOrder = song.order;
    songElement.dataset.songLink = song.link;

    songElement.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text', songElement.dataset.songOrder);
    });

    column.appendChild(songElement);
    return songElement;
}

// Create empty drop slots for the correct order
function createDropSlot(order) {
    const slotElement = document.createElement('div');
    slotElement.classList.add('target-slot');
    slotElement.dataset.targetOrder = order;
    slotElement.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    slotElement.addEventListener('drop', function(e) {
        e.preventDefault();
        const songOrder = e.dataTransfer.getData('text');
        if (songOrder == order) {
            slotElement.classList.add('filled');
            slotElement.textContent = `Correct: ${shuffledSongs.find(s => s.order == order).song}`;
        }
    });
    return slotElement;
}

// Set up the columns with the shuffled songs and empty drop slots
function setupPuzzle() {
    const leftColumn = document.getElementById('initial-songs-left');
    const rightColumn = document.getElementById('initial-songs-right');
    const dropArea = document.getElementById('drop-area');

    shuffledSongs.slice(0, 10).forEach(song => {
        songElements.push(createSongItem(song, leftColumn));
    });

    shuffledSongs.slice(10).forEach(song => {
        songElements.push(createSongItem(song, rightColumn));
    });

    for (let i = 1; i <= 11; i++) {
        dropSlots.push(createDropSlot(i));
        dropArea.appendChild(dropSlots[i - 1]);
    }
}

setupPuzzle();

// Check if the order is correct
function checkOrder() {
    const filledSlots = document.querySelectorAll('.target-slot.filled');
    if (filledSlots.length === 11) {
        const orderedSongs = Array.from(filledSlots).map(slot => slot.textContent);
        if (orderedSongs.join(',') === ['Up on the House Top', 'Up on the Roof', 'Down by the River', 'Down on the Corner', 'Left in the Dark', 'Fight for your Right', 'She Left Me on Friday', 'Everything in its Right Place', 'B&E', 'A Sky Full of Stars', 'Start the Healing'].join(',')) {
            document.getElementById('result').textContent = '🎉 Congratulations! The code is: 3, 1, 5 🎉';
        } else {
            document.getElementById('result').textContent = '❌ Incorrect order. Please try again! ❌';
        }
    } else {
        document.getElementById('result').textContent = '❌ You must place all the songs! ❌';
    }
}
