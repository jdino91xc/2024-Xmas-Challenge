document.getElementById('checkOrder').addEventListener('click', function() {
    let order = [];
    document.querySelectorAll('.song').forEach(function(song) {
        order.push(parseInt(song.getAttribute('data-song')));
    });

    // The correct order for the puzzle
    const correctOrder = [3, 1, 5];

    // Check if the order matches the correct one
    if (JSON.stringify(order) === JSON.stringify(correctOrder)) {
        document.getElementById('result').textContent = "Correct! The order is: " + correctOrder.join(', ');
    } else {
        document.getElementById('result').textContent = "Incorrect. Try again!";
    }
});
