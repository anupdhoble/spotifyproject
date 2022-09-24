console.log("Welcome to Spotify");

//Initailize variables
let songindex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let mastersongname=document.getElementById('mastersongname');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songItemPlay=document.getElementsByClassName('songItemPlay');
let totalsongs='11';

let songs = [
    {songName: "Deep End Ameryh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Unity - Alan Walker", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Rise Up - TheFatRat", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Close Your Eyes - KSHMR", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Believers - Alan Walker", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Let Me Down Slowly", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "1,2,3 - Sofia Reyes", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Hymn For The Weekend", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Play - Alan Walker", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "No Roots - Alice Merton", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Ishare tere - Tseries", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
]
songitem.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName; 
})

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;
        makeAllPlays();
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration) /100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // if(songItemPlay.classList == "fa-solid songItemPlay fa-2x fa-pause"){
        //     makeAllPlays();
        //     audioElement.pause();
        //     masterPlay.classList.remove('fa-pause-circle');
        //     masterPlay.classList.add('fa-play-circle');
        // }
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex==totalsongs-1){
        songindex = 0;
    }
    else{
    songindex+=1;
    }
    //
    makeAllPlays();
    //
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex==0){
        songindex = totalsongs-1;
    }
    else{
    songindex-=1;
    }
    //
    makeAllPlays();
    //
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
