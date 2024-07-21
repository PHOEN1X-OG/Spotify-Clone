let currentSong = new Audio();
let songs;
let currFolder;
let folderurl;
let repeatcount = 0;
let addcount = 0;
let playlists = [];
let plname = [];

async function playlistread(){
    let a = await fetch("http://127.0.0.1:5500/songs")
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // playlists=[];
    // plname=[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        playlists.push(element.href);
    }
    playlists.splice(0,3);
    
    for (let index = 0; index < playlists.length; index++) {
        plname[index] = playlists[index].slice(28);
        
    }
    // console.log(playlists);
    // console.log(plname);

    let image=[];
    let pname=[];
    let num=[];
    for (let i = 0; i < plname.length; i++) {

        image[i] = "songs/" + plname[i] + "/" + plname[i] + ".jpeg";

        pname[i] = plname[i];
        // pname[i] = plnme[i].replace("%20", " ")
        // getSongs(plname[i]);
        // num[i] = songs.length;
        addplaylistleft(image[i], pname[i], 150);
        addplaylistcenter(image[i], pname[i]);
    }
    // console.log(image);
    // console.log(pname);
    // console.log(plname);

    return playlists;
    return plname;
}

async function getSongs(folderurl) {
    let a = await fetch(folderurl);
    let response = await a.text();
    //console.log(folderurl)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs=[];
    // songs.splice(0,songs.length);
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    return songs;
    return songs.length;
}

function addplaylistleft(image, pname, num){
    let area = document.querySelector(".scrollable");
    
    area.innerHTML = area.innerHTML + `<div id="${pname}" class="playlists playlist69">
                        <div class="minicard">
                            <img src="${image}" alt="cant show">
                            <div class="info">
                                <h3 id="${pname}">${pname}</h3>
                                <h4>Playlist • ${num} songs</h4>
                            </div>
                        </div>
                    </div>`
}

function addplaylistcenter(image, pname){
    let left = document.querySelector(".col1");
    let right = document.querySelector(".col2");

    if(addcount<4){
        left.innerHTML = left.innerHTML + ` <div id="${pname}" class="centercard playlist69">
                        <div class="info">
                            <img src="${image}" alt="cant show">
                            <p id="${pname}">${pname}</p>
                        </div>
                        <div class="play">
                            <!-- <img id="greenplaybutton" src="play.svg" alt="cant show"> -->
                        </div>
                    </div>`
    }

    if(addcount>=4 && addcount<8){
        right.innerHTML = right.innerHTML + ` <div id="${pname}" class="centercard playlist69">
                        <div class="info">
                            <img src="${image}" alt="cant show">
                            <p id="${pname}">${pname}</p>
                        </div>
                        <div class="play">
                            <!-- <img id="greenplaybutton" src="play.svg" alt="cant show"> -->
                        </div>
                    </div>`
    }

    addcount++;
}


function showsongdetailsright(){
    let locat = document.querySelector(".right");
    console.log(locat.innerHTML)
    locat.innerHTML = `<div class="nav">
                <div class="listname">
                    ${plname}
                </div>
                <div class="icons">
                    <p>•••</p>
                    <img src="closeicon.png" alt="cant show">
                </div>
            </div>
            <div class="card">
                <img src="${pname}" alt="cant show">
                <h2>${songname}</h2>
                <p>${artistnames}</p>
            </div>
            <div class="credits">
                <div class="heading">
                    <h5>Credits</h5>
                    <p>Show all</p>
                </div>
                <div class="artists">
                    <div class="details">
                        <h4>Anirudh Ravichander</h4>
                        <p>Main Artist, Composer</p>
                    </div>
                    <div class="follow">
                        <p>Follow</p>
                    </div>
                </div>
                <div class="artists">
                    <div class="details">
                        <h4>Ramajogayya Sastry</h4>
                        <p>Main Artist, Lyricist</p>
                    </div>
                    <div class="follow">
                        <p>Follow</p>
                    </div>
                </div>
                <div class="artists">
                    <div class="details">
                        <h4>Jr. NTR</h4>
                        <p>Actor</p>
                    </div>
                    <div class="follow">
                        <p>Follow</p>
                    </div>
                </div>
            </div>`
}

function showsongdetailsbottom(){
    let location = document.querySelector(".songdetails");
    console.log(location.innerHTML)
    location.innerHTML = `<img src="${image}" alt="cant show">
            <div class="details">
                <h5>${songname}</h5>
                <p>${artistnames}</p>
            </div>`
}


const playMusic = (track, pause = false) => {
    currentSong.src = track;
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function timeconversion(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {

    await getSongs("http://127.0.0.1:5500/songs/NTR");

    playMusic(songs[0], true); 
    

    document.querySelector("#play").addEventListener("click", ()=>{
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".currenttime").innerHTML = `${timeconversion(currentSong.currentTime)}`
        document.querySelector(".duration").innerHTML = `${timeconversion(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

        let index = songs.indexOf(currentSong.src)
        if(currentSong.currentTime == currentSong.duration){
            if(index <= songs.length){
                playMusic(songs[index + 1])
            }
        }   
    })

    document.querySelector(".playbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener to previous
    document.querySelector("#previous").addEventListener("click", ()=>{
        currentSong.pause()
        let index = songs.indexOf(currentSong.src)
        if (index >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    document.querySelector("#next").addEventListener("click", ()=>{
        currentSong.pause()
        // let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        let index = songs.indexOf(currentSong.src)
        if (index <= songs.length) {
            playMusic(songs[index + 1])
        }
    })


    document.querySelector("#shuffle").addEventListener("click", ()=>{
        shuffle(songs);
    })

    document.querySelector("#repeat").addEventListener("click", ()=>{
        repeatcount++;
        addplaylistleft();
        addplaylistcenter();

        if(repeatcount == 1){
            //repeatall
        }

        if(repeatcount == 2){
            //repeatone
        }

        if(repeatcount == 3){
            repeatcount = 0;
            //repeatnone
        }
    })


    Array.from(document.getElementsByClassName("playlist69")).forEach(e => { 
        e.addEventListener("click", async item => {
            let folder = e.id;
            let folderurl = "http://127.0.0.1:5500/songs/" + folder
            await getSongs(folderurl);
            playMusic(songs[0], true);
            console.log(folder)
            console.log(folderurl)

        })
    })
}

playlistread();
main();
// showsongdetailsright();
// showsongdetailsbottom();