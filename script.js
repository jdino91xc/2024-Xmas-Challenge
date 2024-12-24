document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");
    const songs = [
        { title: "White Christmas", year: 1942 },
        { title: "Jingle Bell Rock", year: 1957 },
        { title: "Rudolph the Red-Nosed Reindeer", year: 1949 },
        { title: "Frosty the Snowman", year: 1950 },
        { title: "Silent Night", year: 1818 },
    ];

    const column1 = document.getElementById("column1");
    const column2 = document.getElementById("column2");
    const dropArea = document.getElementById("dropArea");

    if (!column1 || !column2 || !dropArea) {
        console.error("One or more required elements are missing.");
        return;
    }

    console.log("Adding songs to columns...");
    songs.forEach((song, index) => {
        const column = index % 2 === 0 ? column1 : column2;
        const songItem = document.createElement("div");
        songItem.className = "song-item";
        songItem.draggable = true;
        songItem.textContent = `${song.title} (${song.year})`;

        songItem.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", song.title);
        });

        console.log(`Adding song: ${song.title} (${song.year}) to ${column.id}`);
        column.appendChild(songItem);
    });
});
