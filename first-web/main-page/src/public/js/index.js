let myVideo = document.getElementById("video");
let myDivvideo = document.getElementById("divvideo");

document.getElementById("botonplay").addEventListener("click", playPause);

document.getElementById("botoncerrar").addEventListener("click", abrirCerrar);

document.getElementById("botonabrir").addEventListener("click", abrirCerrar);

document.getElementById("divvideo").style.display = "none";

function playPause() {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}

function abrirCerrar() {
  if (document.getElementById("divvideo").style.display == "none") {
    document.getElementById("divvideo").style.display = "block";
    myVideo.play();
  } else {
    document.getElementById("divvideo").style.display = "none";
    myVideo.pause();
  }
}
