const songsList = document.getElementById('songs-list');
const checkOrderButton = document.getElementById('checkOrder');
const resultDiv = document.getElementById('result');

let draggedSong = null;

// Enable drag and drop
songsList.addEventListener('dragstart', (e) => {
    draggedSong = e.target;
    e.target.classList.add('dragging');
});

songsList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
});

songsList.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const allSongs = [...songsList.querySelectorAll('.song:not(.dragging)')];
    const afterElement = getDragAfterElement(songsList, e.clientY);
    if (afterElement == null) {
        songsList.appendChild(dragging);
    } else {
        songsList.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.song:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Check if the order is correct
checkOrderButton.addEventListener('click', function() {
    const orderedSongs = [...songsList.querySelectorAll('.song')].map(song => parseInt(song.getAttribute('data-song')));
    
    // The correct order for the puzzle
    const correctOrder = [3, 1, 5];

    // Check if the order matches the correct one
    if (JSON.stringify(orderedSongs) === JSON.stringify(correctOrder)) {
        resultDiv.textContent = "Correct! The order is: " + correctOrder.join(', ');
    } else {
        resultDiv.textContent = "Incorrect. Try again!";
    }
});
