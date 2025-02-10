var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var T = 0;
var Y = 200;
const audio = new Audio();
audio.src = "300hz.m4a";

//besaran sumber
var Ssumber = document.getElementById("posisiSumber");
var nilaiSsumber = document.getElementById("nilaiSsumber");
var vs = document.getElementById("kecepatanSumber");
var nilaiVsumber = document.getElementById("nilaiVsumber");
var fs = document.getElementById("frekuensiSumber");
var nilaiF = document.getElementById("nilaiF");

//menambahkan mobil sumber
class Sumber{
    constructor(){
        this.posisi = {
            x: Ssumber.value,
            y: 540,
        }
        const sumb = new Image()
        sumb.src = 'sumber1.png'

        this.image = sumb
        this.width = 10
        this.height = 10
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const sumber = new Sumber();

nilaiSsumber.innerHTML = Ssumber.value;
sumber.posisi.x = Ssumber.value;
nilaiVsumber.innerHTML = vs.value;
nilaiF.innerHTML = fs.value;

Ssumber.oninput = function (){
    nilaiSsumber.innerHTML = this.value;
    sumber.posisi.x = this.value;
}
vs.oninput = function (){
    nilaiVsumber.innerHTML = this.value;
}
fs.oninput = function (){
    nilaiF.innerHTML = this.value;
}

//besaran pendengar
var Spendengar = document.getElementById("posisiPendengar");
var nilaiSpendengar = document.getElementById("nilaiSpendengar");
var vp = document.getElementById("kecepatanPendengar");
var nilaiVpedengar = document.getElementById("nilaiVpendengar");
var fp;

//menambahkan mobil pendengar
class Pendengar{
    constructor(){
        this.posisi = {
            x: Spendengar.value,
            y: 475,
        }
        const pend = new Image()
        pend.src = 'pendengar.png'

        this.image = pend
        this.width = 10
        this.height = 10
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const pendengar = new Pendengar();

nilaiSpendengar.innerHTML = Spendengar.value;
pendengar.posisi.x = Spendengar.value;
nilaiVpedengar.innerHTML = vp.value;

Spendengar.oninput = function (){
    nilaiSpendengar.innerHTML = this.value;
    pendengar.posisi.x = this.value;
}
vp.oninput = function (){
    nilaiVpedengar.innerHTML = this.value;
}

var run = false;
var start = document.getElementById("start");

start.addEventListener ('click', toogle);

var oldTimeStamp = 0;
var time = 0;
var secondPassed = 0;
var Kecanimasi = 60;

window.onload = setAwal();

function toogle(){
    if(!run){
        start.value = "Stop";
        time = 0;
        sumber.posisi.x = Ssumber.value; 
        pendengar.posisi.x = Spendengar.value;   
    }
    else {
        start.value = "Start";
        sumber.posisi.x = Ssumber.value;
        pendengar.posisi.x = Spendengar.value;
        Y = 200;
        T = 0;
    }
    run = !run;
}

function setAwal(){
    window.requestAnimationFrame(animasi);
}

function animasi(timeStamp){
    secondPassed = (timeStamp - oldTimeStamp)/1000.;
    oldTimeStamp = timeStamp;
    update();
    draw();
    window.requestAnimationFrame(animasi);
}

function update(){
    if(run){
        T += Kecanimasi*secondPassed;
        time += Kecanimasi*secondPassed;
        sumber.posisi.x = (vs.value*T*0.4)+Ssumber.value*1;
        pendengar.posisi.x = (vp.value*T*0.4)+Spendengar.value*1;
   
        if (sumber.posisi.x < pendengar.posisi.x){
            fp = ((340-vp.value)/(340-vs.value))*(fs.value);
        }
        else {
            fp = ((340+vp.value)/(340+vs.value))*(fs.value);
        }

        if (pendengar.posisi.x > 1120 || sumber.posisi.x > 1120){
            pendengar.posisi.x = Spendengar.value;
            sumber.posisi.x = Ssumber.value;
            T=0;
            start.value = "Start";
            run = !run;
        }
        if(sumber.posisi.x < 1120 || pendengar.posisi.x < 1120){
            audio.play();
        }
    }
    else {
        sumber.posisi.x = Ssumber.value;
        pendengar.posisi.x = Spendengar.value;
    }
}

function draw(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    //sumber
    sumber.draw();
    //pendengar
    pendengar.draw();

    c.fillStyle = "black";
    c.font = "Bold 26px Times New Roman";
    c.fillText("Frekuensi Pendengar: "+Math.floor(fp)+" Hz", 10, 250);
}
draw();


//pop up event
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}