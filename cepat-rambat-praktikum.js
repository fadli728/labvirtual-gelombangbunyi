var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var T = 0;
var X0 = 20;
var Y0 = 100;
var sudut0 = 0;
var X = X0;
var Y = Y0;
var sudut = sudut0;
var speed = 1;
var v;
var PosX;
var A = 50;
var z = 20;
const audio = new Audio();
audio.src = "300hz.m4a";

const wave = {
    y: canvas.height / 2,
    lenght: 0.1,
    amplitude: 0,
}

//besaran medium padat
var nilaiP = document.getElementById("nilaiP");
var P = document.getElementById("sliderP");
var nilaiE = document.getElementById("nilaiE");
var E = document.getElementById("sliderE");

nilaiP.innerHTML = P.value;
nilaiE.innerHTML = E.value;

P.oninput = function (){
    nilaiP.innerHTML = this.value;
}
E.oninput = function (){
    nilaiE.innerHTML = this.value;
}

//besaran medium cair
var nilaiB = document.getElementById("nilaiB");
var B = document.getElementById("sliderB");

nilaiB.innerHTML = B.value;

B.oninput = function (){
    nilaiB.innerHTML = this.value;
}

//besaran medium gas
var nilaiK = document.getElementById("nilaiK");
var K = document.getElementById("sliderK");
var nilaiM = document.getElementById("nilaiM");
var M = document.getElementById("sliderM");
var nilaiTemp = document.getElementById("nilaiT");
var Temp = document.getElementById("sliderT");

nilaiK.innerHTML = K.value;
nilaiM.innerHTML = M.value;
nilaiTemp.innerHTML = Temp.value;

K.oninput = function (){
    nilaiK.innerHTML = this.value;
}
M.oninput = function (){
    nilaiM.innerHTML = this.value;
}
Temp.oninput = function (){
    nilaiTemp.innerHTML = this.value;
}

//ganti medium
var medium = document.getElementById("medium1");

var run = false;
var start = document.getElementById("start");

start.addEventListener ('click', toogle);

var oldTimeStamp = 0;
var time = 0;
var secondPassed = 0;
var Kecanimasi = 60;

//menambahkan gambar tabel gas
class Tabel3{
    constructor(){
        this.posisi = {
            x: 800,
            y: Y0+240,
        }
        const mdm = new Image()
        mdm.src = 'tabel.gas.png'

        this.image = mdm;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const tabelGas = new Tabel3();

//menambahkan gambar tabel padat
class Tabel1{
    constructor(){
        this.posisi = {
            x: 800,
            y: Y0+40,
        }
        const mdm = new Image()
        mdm.src = 'tabel.padat.png'

        this.image = mdm;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const tabelPadat = new Tabel1();

//menambahkan gambar tabel cair
class Tabel2{
    constructor(){
        this.posisi = {
            x: 800,
            y: Y0+150,
        }
        const mdm = new Image()
        mdm.src = 'tabel.cair.png'

        this.image = mdm;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const tabelCair = new Tabel2();

//menambahkan gambar grafik
class Grafik{
    constructor(){
        this.posisi = {
            x: 130,
            y: Y0+210,
        }
        const mdm = new Image()
        mdm.src = 'grafik.png'

        this.image = mdm;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const grafik = new Grafik();

//menambahkan gambar medium
class Medium{
    constructor(){
        this.posisi = {
            x: 130,
            y: Y0,
        }
        const mdm = new Image()
        mdm.src = 'padat.png'

        this.image = mdm;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const medium1 = new Medium();

//menambahkan gambar telinga
class Telinga{
    constructor(){
        this.posisi = {
            x: 720,
            y: Y0+20,
        }
        const tlg = new Image()
        tlg.src = 'telinga.png'

        this.image = tlg;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const telinga = new Telinga();

//menambahkan gambar speaker
class Speaker{
    constructor(){
        this.posisi = {
            x: 50,
            y: Y0+20,
        }
        const spk = new Image()
        spk.src = 'speaker.png'

        this.image = spk;
        this.width = 0;
        this.height = 100;
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const speaker = new Speaker();

//menambahkan gelombang
class Gelombang{
    constructor(){
        this.posisi = {
            x: X0+110,
            y: Y0+30,
        }
        const glb = new Image()
        glb.src = 'gelombang.png'

        this.image = glb
        this.width = 10
        this.height = 10
    }
    draw(){
        c.drawImage(this.image, this.posisi.x, this.posisi.y)
    }
}
const gelombang = new Gelombang();

window.onload = setAwal();

function toogle(){
    if(!run){
        c.clearRect(0, 0, canvas.width, canvas.height);
        start.value = "Stop";
        medium.value;
    }
    else {
        c.clearRect(0, 0, canvas.width, canvas.height);
        start.value = "Start";
        medium.value;
        T = 0;
        X0 = 20;
        X = X0;
        Y0 = 100;
        Y = Y0;
        sudut = sudut0;
        gelombang.posisi.x = X0+110;
        gelombang.posisi.y = Y0+30;
    }
    run = !run;
}

function setAwal(){
    if (medium.value == "padat" ){
        v = Math.sqrt(E.value*10000/P.value);
        X = (v*T)+X0;
        medium1.image.src = 'padat.png';
    }
    if (medium.value == "cair" ){
        v = Math.sqrt(B.value*10000/P.value);
        X = (v*T)+X0;
        medium1.image.src = 'cair.png';
    }
    if (medium.value == "gas" ){
        v = Math.sqrt(K*(8.314*Temp/M));
        X = (v*T)+X0;
        medium1.image.src = 'gas.png';
    }
    window.requestAnimationFrame(animasi);
}

function animasi(timeStamp){
    secondPassed = (timeStamp - oldTimeStamp)/10000.;
    oldTimeStamp = timeStamp;
    update();

    window.requestAnimationFrame(animasi);

    gambar();
    drawSinus();
    drawSinus1();
}

function update(){
    if (run){
        T += Kecanimasi*secondPassed;
        wave.amplitude = 0 + v;
        sudut = (T*z) + sudut0;
        Y = A*(speed*Math.sin(-sudut*Math.PI/180))+Y0-3;
        if (medium.value == "padat" ){
            v = Math.sqrt(E.value*10000/P.value);
            X = (v*T)+X0;
            gelombang.posisi.x = (v*T)+X0+110;
            medium1.image.src = 'padat.png';
        }
        if (medium.value == "cair" ){
            v = Math.sqrt(B.value*10000/P.value);
            X = (v*T)+X0;
            gelombang.posisi.x = (v*T)+X0+110;
            medium1.image.src = 'cair.png';
        }
        if (medium.value == "gas" ){
            v = Math.sqrt(K.value*(8.314*Temp.value/M.value)); 
            X = (v*T)+X0;
            gelombang.posisi.x = (v*T)+X0+110;
            medium1.image.src = 'gas.png';
        }
        medium1.draw();
        
        if (gelombang.posisi.x+80 > telinga.posisi.x){
            c.clearRect(0, 0, canvas.width, canvas.height);
            X0 = 20;
            X = X0;
            gelombang.posisi.x = X0+110;
            gelombang.posisi.y = Y0+30;
            Y0 = 100;
            Y = Y0;
            T = 0;
            sudut = (T*z) + sudut0;
        }
    }
    else{
        X0 = 20;
        X = X0;
        Y0 = 100;
        Y = Y0;
        sudut = (T*z) + sudut0;
        wave.amplitude = 0;
        gelombang.posisi.x = X0+110;
        gelombang.posisi.y = Y0+30;
    }
    if(X > X0){
        audio.play();
    }
}

function drawSinus(){
    c.beginPath()
    c.moveTo(X0+120, Y0+250);
    

    for (let i = 0; i < X0+X; i++) {
        c.lineTo(i+140, (Y0+250) + Math.sin(i * wave.lenght + (2,3)) * wave.amplitude)
    }
    c.strokeStyle = "red";
    c.lineWidth = 5;
    c.stroke()
}
drawSinus();
function drawSinus1(){
    for (let i = 0; i < X0+X; i++) {
        PosX = (Y0+300) + Math.sin(i * wave.lenght + (2,3)) * wave.amplitude;
    }
    c.fillRect(PosX+X-260, 400, 1, 50);
    c.stroke();
}
drawSinus1();
function gambar(){
    c.clearRect(0, 0, canvas.width, canvas.height-100);
    //gelombang
    medium1.draw();
    speaker.draw();
    telinga.draw();
    gelombang.draw();
    tabelPadat.draw();
    tabelCair.draw();
    tabelGas.draw();

    c.fillStyle = "brown";
    c.font = "Bold 26px Times New Roman";
    c.fillText("Cepat Rambat Bunyi: "+Math.floor(v*Math.sqrt(10000))+" m/s", 150, 90);
}
gambar();


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