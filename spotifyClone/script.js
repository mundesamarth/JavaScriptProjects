console.log("welcome buddy");

// variable initalization
let songIndex = 0;
let audioElement = new Audio("/spotifyClone/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let timeStamp = document.getElementsByClassName("timeStamp");
let songs = [
  {
    songName: "arriyo - Mortals (feat. Laura Brehe) (NCS Release",
    filePath: "/spotifyClone/songs/1.mp3",
    coverPath: "/spotifyClone/covers/1.jpg",
  },
  {
    songName: "Cielo",
    filePath: "/spotifyClone/songs/2.mp3",
    coverPath: "/spotifyClone/covers/2.jpg",
  },
  {
    songName: "DEAF KEV- Invincible [NCS Release]-320k",
    filePath: "/spotifyClone/songs/3.mp3",
    coverPath: "/spotifyClone/covers/3.jpg",
  },
  {
    songName: "Janji-Heroes -Tonsght-feat-Johnning",
    filePath: "/spotifyClone/songs/4.mp3",
    coverPath: "/spotifyClone/covers/4.jpg",
  },
  {
    songName: "forgot",
    filePath: "/spotifyClone/songs/5.mp3",
    coverPath: "/spotifyClone/covers/5.jpg",
  },
  {
    songName: "forgot",
    filePath: "/spotifyClone/songs/6.mp3",
    coverPath: "/spotifyClone/covers/6.jpg",
  },
  {
    songName: "forgot",
    filePath: "/spotifyClone/songs/7.mp3",
    coverPath: "/spotifyClone/covers/7.jpg",
  },
  {
    songName: "forgot",
    filePath: "/spotifyClone/songs/8.mp3",
    coverPath: "/spotifyClone/covers/8.jpg",
  },
  {
    songName: "Sakhiyaan - Salan-e-Isha",
    filePath: "/spotifyClone/songs/9.mp3",
    coverPath: "/spotifyClone/covers/9.jpg",
  },
  {
    songName: "Tunhari Kasan salan-e-Ishq",
    filePath: "/spotifyClone/songs/10.mp3",
    coverPath: "/spotifyClone/covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // timeStamp[i].innerText = audioElement[i].duration;
  // element.getElementsByClassName('timeStamp').innerText = audioElement[i].duration;
});
// audio element

// play/pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
  }
});
// listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      console.log("clicked");
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      songIndex = parseInt(e.target.id);
      makeAllPlay();
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.src = `/spotifyClone/songs/${songIndex + 1}.mp3`;
      audioElement.play();
      gif.style.opacity = 1;

      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.src = `/spotifyClone/songs/${songIndex + 1}.mp3`;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 9) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.src = `/spotifyClone/songs/${songIndex + 1}.mp3`;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
