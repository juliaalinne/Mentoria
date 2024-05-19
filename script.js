const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const buttonAvancar = document.getElementById('avancar');
const buttonVoltar = document.getElementById('voltar');

const musicTitle = document.querySelector('.desc-musica p');
const musicArtist = document.querySelector('.desc-musica span');
const musicImage = document.querySelector('.conteudo-musica img');
const cardPlayer = document.querySelector('.card-player');


const playlist = [
  {
    title: "A Carta - Ao Vivo",
    artist: "Exaltasamba",
    audio: "./assets/ACarta.mp3",
    image: "./assets/ACarta.jpeg",
  },
  {
    title: "Eu e você sempre - Ao Vivo",
    artist: "Jorge Aragão",
    audio: "./assets/EueVoce.mp3",
    image: "./assets/EueVoce.jpeg",
  },
  {
    title: "Na hora do almoço",
    artist: "Belchior",
    audio: "./assets/Hdoalmoço.mp3",
    image: "./assets/Hdoalmoço.jpeg",
  },
  {
    title: "Ponto Final",
    artist: "Limão com Mel",
    audio: "./assets/Pontofinal.mp3",
    image: "./assets/Pontofinal.jpeg",
  },
];

const music = new Audio();
let interval;
let currentIndex = 0;


function carregarMusica(currentIndex) {
  const musica = playlist[currentIndex];
  musicTitle.textContent = musica.title;
  musicArtist.textContent = musica.artist;
  musicImage.src = musica.image;
  music.src = musica.audio;
  
  music.addEventListener('loadedmetadata', function() {
    tempoTotal.textContent = formatarTempo(music.duration);
  });
  
  tempoAtual.textContent = "00:00";
  progressBar.value = 0;

  cardPlayer.classList.remove('ACarta', 'EueVoce', 'NaHora', 'PontoFinal');

  if (currentIndex === 0) {
    cardPlayer.classList.add('ACarta');
  } else if (currentIndex === 1) {
    cardPlayer.classList.add('EueVoce');
  } else if (currentIndex === 2) {
    cardPlayer.classList.add('NaHora');
  }  else if (currentIndex === 3) {
    cardPlayer.classList.add('PontoFinal');
  }
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

function avancar() {
  currentIndex = (currentIndex + 1) % playlist.length; 
  carregarMusica(currentIndex);
  play();
}
  
function play() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.pause();
  clearInterval(interval);
}

function voltar() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  carregarMusica(currentIndex);
  play();
}

function setProgress(){
  const progressBarra = progressBar.value;
  const tempo = (progressBarra/100)* music.duration;
  music.currentTime = tempo;
}

carregarMusica(currentIndex); 
buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
buttonAvancar.addEventListener('click', avancar);
buttonVoltar.addEventListener('click', voltar);
progressBar.addEventListener('input', setProgress);


