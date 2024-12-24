document.addEventListener("DOMContentLoaded", () => {
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

    // Shuffle the songs
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);

    // Get columns for available songs
    const column1 = document.getElementById("column1");
    const column2 = document.getElementById("column2");
    const dropArea = document.getElementById("dropArea");

    // Populate the left two columns with shuffled songs
    shuffledSongs.forEach((song, index) => {
        const column = index % 2 === 0 ? column1 : column2; // Alternate between columns
        const songItem = document.createElement("div");
        songItem.className = "song-item";
        songItem.draggable = true;
        songItem.textContent = `${song.title} (${song.year})`;
        songItem.dataset.index = index;

        // Add drag event listener
        songItem.addEventListener("dragstart", dragStart);
        column.appendChild(songItem);
    });

    // Create empty slots in the drop area
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
    window.checkOrder 
