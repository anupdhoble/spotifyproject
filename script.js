console.log("Welcome to Spotify");
console.log("A fun project to test my skills. \nAll rights of songs and logos are reserverd with respective parties.\nWe respect your copyrights and would love to here out issues(if any).");
console.log('Made by :- Anup Dhoble \nInstagram:- @anupdhoble15' );
console.log("Report any issues:- anupdhoble15@gmail.com")

//Initailize variables
let songindex =0;
let i=-1; //for pausing from song list
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let mastersongname=document.getElementById('mastersongname');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songItemPlay=document.getElementsByClassName('songItemPlay');
let totalsongs='15';

let songs = [
    {songName: "Excuses - AP Dhillon", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Unity - Alan Walker", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Rise Up - TheFatRat", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Close Your Eyes - KSHMR", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Believers - Alan Walker", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Let Me Down Slowly", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "1,2,3 - Sofia Reyes", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Hymn For The Weekend", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Play - Alan Walker", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "No Roots - Alice Merton", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Ishare tere - TSeries", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Sakhiyaan - White Hill Music", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "The Drum - Alan Walker", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "We Don't Talk Anymore", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Deep End Ameryh", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
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
        console.log('Play from mastercontrol initiated....');
        document.getElementById(songindex).classList.remove('fa-play');
        document.getElementById(songindex).classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;
        makeAllPlays();
        console.log('Pause from mastercontrol initiated....');
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    
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
         if(element.classList == "fa-solid songItemPlay fa-2x fa-pause"){
            makeAllPlays();
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            i=element;
            gif.style.opacity =0;
            console.log('Pause from song list initiated....');
           }
        else if(element.classList == "fa-solid songItemPlay fa-2x fa-play"&&i==element){
            audioElement.play();
            gif.style.opacity =1;
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            console.log('Play from song list(after pausing same song) initiated....');
            i=-1;
        }
        else{
            i=-1;
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
        console.log('Play from song list initiated....');
        }
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
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');
    console.log('Next from mastercontrol initiated.....');
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
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');
    console.log('Previous from master control initiated....');
})

//Play next song after end of one 

audioElement.addEventListener('ended',()=>{
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
    console.log('Current song ended,next song initiated....'); 
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');
})
