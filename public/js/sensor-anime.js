
// ------------------------------------------------------------------------------------------------------
// This file contains functions for animating sensor values and updating the display.
// It includes animations for water level and water temperature, as well as a function to update sensor values at regular intervals.
// ----------------------------------------------------------------------------------------------------




// card waterlevel animation and value update--------------------------------------------------------------------
function setupWaterLevelWave() {
    for (let i = 0; i < 6; i++) {
        const waveShape = document.createElement('div');
        waveShape.className = 'wave-shape';
        waveShape.style.animationDelay = Math.random() * 5 + 's'; // Random delay between 0s and 5s
        waveShape.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random duration between 2s and 5s
        document.getElementById('layer-waterLevel').appendChild(waveShape);
    }
}

function setWaterLevel(level) {
    let waterLevelFill = document.getElementById('layer-waterLevel');
    waterLevelFill.style.height = level + '%';
    let waterLevelText = document.getElementById('value-waterLevel');
    waterLevelText.innerHTML = level + '<span class="unit">%</span>';
}
// ----------------------------------------------------------------------------------------------------------------------
// card water temperature animation and value update--------------------------------------------------------------------
const layerWaterTemp = document.getElementById("layer-waterTemp");
const valWaterTemp = document.getElementById('value-waterTemp');

let bubbleCreateInterval = 800;   // ms (lower = more bubbles)
let riseSpeedBubble = 5;     // animation duration base

function createBubble() {
  let b = document.createElement("div");
  b.classList.add("bubble");
  b.style.left = Math.random() * 100 + "%";

  let duration = (Math.random() * riseSpeedBubble).toFixed(2);
  b.style.animationDuration = duration + "s";

  let size = Math.random() * 8 + 6;
  b.style.width = size + "px";
  b.style.height = size + "px";

  layerWaterTemp.appendChild(b);

  // auto remove after animation ends
  setTimeout(() => {
    b.remove();
  }, duration * 1000);
}

// continuous loop
setInterval(() => {
  createBubble();
}, bubbleCreateInterval);

function setWaterTemp(temp) {
  valWaterTemp.innerHTML = temp + '<span class="unit">°C</span>';
  bubbleCreateInterval =  (temp < 15) ? 1000 : (temp < 30) ? 700 : 400; // colder = fewer bubbles
  riseSpeedBubble = (temp < 15) ? 7 : (temp < 30) ? 5 : 3; // colder = slower rise
}
// ----------------------------------------------------------------------------------------------------------------------
// card water TDS animation and value update--------------------------------------------------------------------
const layerWaterTds = document.getElementById("layer-waterTds");
const valWaterTds = document.getElementById("value-waterTds");

let particleTdsCreateInterval = 800;
let particleTdsSpeed = 5;
let particleTdsDensity = 10;

function createZigzagParticle(element, idName, speedMultiplier = 0.1, sizeMultiplier = 1) {
  let id = idName + Date.now() + Math.floor(Math.random()*1000);

  let x1 = Math.floor(Math.random()*100);
  let x2 = Math.floor(Math.random()*100);
  let x3 = Math.floor(Math.random()*100);
  let x4 = Math.floor(Math.random()*100);
  let x5 = Math.floor(Math.random()*100);
  
  let y1 = Math.floor(Math.random()*100);
  let y2 = Math.floor(Math.random()*100);
  let y3 = Math.floor(Math.random()*100);
  let y4 = Math.floor(Math.random()*100);
  let y5 = Math.floor(Math.random()*100);

  let duration = ((Math.random()*4 )).toFixed(2); // 3-7 seconds

  let keyframe = `
  @keyframes ${id} {
    0%  { transform: translate(${x1 * speedMultiplier}px, ${y1 * speedMultiplier}px); opacity:0; }
    20%  { transform: translate(${x2 * speedMultiplier}px, ${y2 * speedMultiplier}px); opacity:0.7; }
    40%  { transform: translate(${x3 * speedMultiplier}px, ${y3 * speedMultiplier}px); opacity:0.4; }
    60%  { transform: translate(${x4 * speedMultiplier}px, ${y4 * speedMultiplier}px); opacity:0.5; }
    80%  { transform: translate(${x5 * speedMultiplier}px, ${y5 * speedMultiplier}px); opacity:0.7; }
    100% { transform: translate(${x5 * speedMultiplier}px, ${y5 * speedMultiplier}px); opacity:0; }
  }`;

  let style = document.createElement("style");
  style.innerHTML = keyframe;
  document.head.appendChild(style);
  element.style.animation = `${id} ${duration}s linear forwards`;

  setTimeout(()=>{
    element.remove();
    style.remove(); // cleanup
  }, duration*1000);
}

function createTDSParticle() {
  let p = document.createElement("div");
  p.classList.add("tds-particle");

  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";

  let size = Math.random() * 2 + 1;
  p.style.width = size + "px";
  p.style.height = size + "px";

  createZigzagParticle(p, "tdsParticle", 0.1);
  p.style.boxShadow = `0 0 ${Math.random()*4}px rgba(255,255,255,0.5)`;
  layerWaterTds.appendChild(p);
}

// continuous flow
setInterval(() => {
  for (let i = 0; i < particleTdsDensity; i++) {
    createTDSParticle();
  }
}, particleTdsCreateInterval);

function setTDS(value) {
  valWaterTds.innerHTML = value + '<span class="unit">PPM</span>';

  particleTdsCreateInterval = (value < 200) ? 1000 : (value < 500) ? 700 : 400; // lower TDS = fewer particles
  particleTdsSpeed = (value < 200) ? 7 : (value < 500) ? 5 : 3; // lower TDS = slower particles
  particleTdsDensity = (value < 200) ? 3 : (value < 500) ? 6 : 9; // lower TDS = less dense particles
}

// ----------------------------------------------------------------------------------------------------------------------
// card water muddiness animation and value update----------------------------------------------------------------

const layerWaterMuddy = document.getElementById("layer-waterMuddy");
const valWaterMuddy = document.getElementById('value-waterMuddy');

let particleMuddyCreateInterval  = 1000;
let particleMuddySpeed = 6;
let particleMuddyDensity = 5;

function createParticle() {
  let p = document.createElement("div");
  p.classList.add("mud-particle");

  let size = Math.random() * 4 + 2;
  p.style.width = size + "px";
  p.style.height = size + "px";

  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";

  createZigzagParticle(p, "mudParticle", 0.1, 1);

  p.style.filter = `blur(${Math.random() * 1.5}px)`;

  let baseOpacity = Math.random() * 0.5 + 0.3;
  p.style.background = `rgba(80,60,40,${baseOpacity})`;

  layerWaterMuddy.appendChild(p);
}

// continuous generation
setInterval(() => {
  for (let i = 0; i < particleMuddyDensity; i++) {
    createParticle();
  }
}, particleMuddyCreateInterval);

function setTurbidity(value) {
  valWaterMuddy.innerHTML = value + '<span class="unit">%</span>';
  particleMuddyCreateInterval = (value < 30) ? 1000 : (value < 70) ? 700 : 400; // lower turbidity = fewer particles
  particleMuddySpeed = (value < 30) ? 7 : (value < 70) ? 5 : 3; // lower turbidity = slower particles
  particleMuddyDensity = (value < 30) ? 2 : (value < 70) ? 5 : 10; // lower turbidity = less dense particles
}
// ----------------------------------------------------------------------------------------------------------------------
// air pressure card animation and value update----------------------------------------------------------------

const valueAirPressure = document.getElementById("value-airPressure");
const layerAirPressure = document.getElementById("layer-airPressure");

let airWaveCreateInterval = 1200;
let airWaveSpeed  = 10;

/* CREATE WAVE */
function createWave() {
  let w = document.createElement("div");
  w.classList.add("air-wave");
  w.style.top = Math.random() * 60 + "%";
  let duration = Math.random() * airWaveSpeed + 5;
  w.style.animation = `airWaveMove ${duration}s linear forwards`;

  w.style.transform = `scaleY(${Math.random()*0.5 + 0.8})`;
  layerAirPressure.appendChild(w);
  setTimeout(() => {
    w.remove();
  }, duration * 1000);
}

/* CONTINUOUS SPAWN */
setInterval(() => {
  createWave();
}, airWaveCreateInterval);

/* UPDATE PRESSURE */
function setAirPressure(p) {
  valueAirPressure.innerHTML = p + '<span class="unit">hPa</span>';
  airWaveCreateInterval = (p < 1000) ? 1200 : (p < 1020) ? 800 : 400; // lower pressure = more waves
  airWaveSpeed = (p < 1000) ? 14 : (p < 1020) ? 10 : 6; // lower pressure = faster waves
}

// ----------------------------------------------------------------------------------------------------------------------
// air temperature card animation and value update----------------------------------------------------------------

const valueAirTemp = document.getElementById("value-airTemp");
const layerAirTemp = document.getElementById("layer-airTemp");

let heatCreateInterval = 1200;
let heatSpeed = 8;

function createHeat() {
  let h = document.createElement("div");
  h.classList.add("heat-particle");
  h.style.left = Math.random() * 100 + "%"
  h.style.width = Math.random() * 20 + 10 + "px";

  let duration = Math.random() * heatSpeed + 4;
  h.style.animation = `heatRise ${duration}s linear forwards`;

  layerAirTemp.appendChild(h);
  setTimeout(() => {
    h.remove();
  }, duration * 1000);
}

setInterval(() => {
  createHeat();
}, heatCreateInterval);

/* UPDATE TEMP */
function setAirTemp(t) {
  valueAirTemp.innerHTML = t + '<span class="unit">°C</span>';
  heatCreateInterval =  (t < 15) ? 2000 : (t < 30) ? 1200 : 500; // colder = fewer heat particles
  heatSpeed = (t < 15) ? 12 : (t < 30) ? 8 : 4; // colder = slower heat rise
}


// ----------------------------------------------------------------------------------------------------------------------
// humidity card animation and value update----------------------------------------------------------------

const layerHumidity = document.getElementById("layer-humidity");
const valueHumidity = document.getElementById("value-humidity");

let humidityCreateInterval = 1000;
let humidityDensity = 2;

/* CREATE DYNAMIC KEYFRAME */
function createDrop() {

  let d = document.createElement("div");
  d.classList.add("droplet");

  let size = Math.random() * 4 + 1;
  d.style.width = size + "px";
  d.style.height = size + "px";

  d.style.left = Math.random() * 100 + "%";
  d.style.top = Math.random() * 100 + "%";

  createZigzagParticle(d, "droplet", 0.1, 1);

  d.style.filter = `blur(${Math.random() * 1.5}px)`;

  let baseOpacity = Math.random() * 0.5 + 0.3;
  d.style.background = `rgba(80,60,40,${baseOpacity})`;

  layerHumidity.appendChild(d);
}

/* CONTINUOUS SPAWN */
setInterval(()=>{
  for(let i = 0;i < humidityDensity; i++){
    createDrop();
  }
}, humidityCreateInterval);

/* UPDATE HUMIDITY */
function setHumidity(h){
  valueHumidity.innerHTML = h + '<span class="unit">%</span>';

  humidityCreateInterval = (h < 30) ? 1000 : (h < 70) ? 700 : 400; // lower humidity = fewer droplets
  humidityDensity = (h < 30) ? 1 : (h < 70) ? 2 : 5; // lower humidity = less dense droplets

}

// ----------------------------------------------------------------------------------------------------------------------
// air quality card animation and value update----------------------------------------------------------------

const layerAirQuality = document.getElementById("layer-AirQuality");
const valueAirQuality = document.getElementById("value-AQI");

let aqiCreateInterval = 1200;
let densityAir = 3;

/* CREATE PARTICLE */
function createParticleAir(){

  let p = document.createElement("div");
  p.classList.add("particleAir");

  let size = Math.random() * 4 + 1;
  p.style.width = size + "px";
  p.style.height = size + "px";

  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";

  createZigzagParticle(p, "particleAir", 0.1, 1.5);

  p.style.filter = `blur(${Math.random() * 1.5}px)`;

  let baseOpacity = Math.random() * 0.5 + 0.3;
  p.style.background = `rgba(80,60,40,${baseOpacity})`;

  layerAirQuality.appendChild(p);
}

/* CONTINUOUS SPAWN */
setInterval(()=>{
  for(let i=0;i<densityAir;i++){
    createParticleAir();
  }
}, aqiCreateInterval);

/* UPDATE AQI */
function setAQI(aqi){
  valueAirQuality.innerHTML = aqi + '<span class="unit">AQI</span>';
  aqiCreateInterval = (aqi < 100) ? 1200 : (aqi < 200) ? 800 : 400; // better AQI = fewer particles
  densityAir = (aqi < 100) ? 3 : (aqi < 200) ? 5 : 7; // better AQI = less dense particles

}

// ----------------------------------------------------------------------------------------------------------------------
// rain card animation and value update----------------------------------------------------------------

const layerRain = document.getElementById("layer-rainfall");
const valueRain = document.getElementById("value-rainfall");
//const card = document.getElementById("card");

let rainCreateInterval = 200;
let densityRain = 3;
let windRain = 0;

/* CREATE RAIN DROP */
function createRainfall(){

  let d = document.createElement("div");
  d.classList.add("raindrop");

  let id = "raindrop" + Date.now() + (Math.random()*1000).toFixed(0);

  let drift = (Math.random()*20).toFixed(1) - 10 + windRain;
  let duration = (Math.random()*0.8).toFixed(1) + 2;

  d.style.height = Math.random()*10 + 10; + "px";
  d.style.width = Math.random()*1.5 + 1; + "px";
  d.style.filter = `blur(${Math.random() * 1}px)`;

  let keyframe = `
  @keyframes ${id} {
    0% { transform: translate(0px, -30px); opacity:0; }
    10% { opacity:0.6; }
    50% { opacity:0.9; }
    90% { opacity:0.6; }
    100% { transform: translate(${drift}px, ${document.querySelector(".card-bg-rainfall").offsetHeight + 10 }px); opacity:0; }
  }`;

  let style = document.createElement("style");
  style.innerHTML = keyframe;
  document.head.appendChild(style);

  d.style.left = Math.floor(Math.random()*100) + "%";
  d.style.top = '0px';
  d.style.animation = `${id} ${duration}s linear forwards`;

  layerRain.appendChild(d);
  

  // SPLASH
  setTimeout(()=>{
    createSplash(d.style.left);
  }, duration*1000 - 60);

  setTimeout(()=>{
    d.remove();
    style.remove();
  }, duration*2000);
}

/* CREATE SPLASH */
function createSplash(x){
  let s = document.createElement("div");
  s.classList.add("splash-rain");

  s.style.left = x;
  s.style.top = (Math.floor(Math.random()*80) + 120) + "px";

  let id = "splash" + Date.now() + (Math.random()*1000).toFixed(0);

  let keyframe = `
  @keyframes ${id} {
    0% { transform: scale(0.5); opacity:0.6; }
    100% { transform: scale(2); opacity:0; }
  }`;

  let style = document.createElement("style");
  style.innerHTML = keyframe;
  document.head.appendChild(style);

  s.style.animation = `${id} 0.4s ease forwards`;

  layerRain.appendChild(s);

  setTimeout(()=>{
    s.remove();
    style.remove();
  },400);
}

/* CONTINUOUS SPAWN */
setInterval(()=>{
  for(let i=0;i< densityRain;i++){
    createRainfall();
  }
}, rainCreateInterval);

/* UPDATE RAIN INTENSITY */
function setRainfall(mm){

  valueRain.innerHTML = mm + '<span class="unit">%</span>';

  rainCreateInterval = (mm < 20) ? 200 : (mm < 50) ? 100 : 50; // lower rainfall = fewer drops
  densityRain = (mm < 20) ? 3 : (mm < 50) ? 5 : 10; // lower rainfall = less dense drops 
  windRain = (mm < 20) ? 0 : (mm < 50) ? 5 : 10; // lower rainfall = less drift
}


// ----------------------------------------------------------------------------------------------------------------------
// wind card animation and value update----------------------------------------------------------------



const layerWind = document.getElementById("layer-wind-speed");
const valueWind = document.getElementById("value-wind");
//const card = document.getElementById("card");

let windCreateInterval = 200;
let densityWind = 3;
let windVertical = 0;

/* CREATE RAIN DROP */
function createWind(){

  let w = document.createElement("div");
  w.classList.add("wind-wave");

  let id = "wind" + Date.now() + (Math.random()*1000).toFixed(0);

  let drift = (Math.random()*20).toFixed(1) - 10 + windVertical;
  let duration = Math.random().toFixed(1) + 30;
  let height = (Math.random()*2).toFixed(1) + 1;
  let width = Math.random()*10 + 10;

  w.style.height = height + "px";
  w.style.width = width + "px";
  w.style.filter = `blur(${Math.random() * 1}px)`;

  let keyframe = `
  @keyframes ${id} {
    0% { transform: translate(-20px, 0px); opacity:0; }
    10% { opacity:0.6; }
    50% { opacity:0.9; }
    90% { opacity:0.6; }
    100% { transform: translate(${document.querySelector(".card-bg-wind").offsetWidth + 20}px, ${drift}px); opacity:0; }
  }`;

  let style = document.createElement("style");
  style.innerHTML = keyframe;
  document.head.appendChild(style);

  w.style.top = Math.floor(Math.random()*100) + "%";
  w.style.left = '0px';
  w.style.animation = `${id} ${duration}s linear forwards`;

  layerWind.appendChild(w);
  
  setTimeout(()=>{
    w.remove();
    style.remove();
  }, duration*2000);
}


/* CONTINUOUS SPAWN */
setInterval(()=>{
  for(let i=0;i< densityWind;i++){
    createWind();
  }
}, windCreateInterval);

/* UPDATE RAIN INTENSITY */
function setWindSpeed(mps){

  valueWind.innerHTML = mps + "<span class='unit'>m/s</span>";
  windCreateInterval = (mps < 2) ? 200 : (mps < 10) ? 100 : 50; // lower wind = fewer gusts
  densityWind = (mps < 2) ? 1 : (mps < 10) ? 3 : 5; // lower wind = less dense gusts
  windVertical = (mps < 2) ? 3 : (mps < 10) ? 10 : 20; // lower wind = less vertical movement
}


/* ----------------------------------------------------------------------------------------------------------------------
sunlight card animation and value update----------------------------------------------------------------
*/

const valueSunlight = document.getElementById("value-sunlight");

function setSunlight(sun){
  valueSunlight.innerHTML = sun + '<span class="unit">%</span>';

  let t = sun / 1000;
  let center = Math.floor(200 + (55 * t));
  let r = Math.floor(150 + (105 * t));
  let g = Math.floor(0 + (80 * t));
  let b = Math.floor(0 + (40 * t));
  let glowSize = 25 + (140 * t);
  let glowOpacity = 0.35 + (0.65 * t);
  let scale = 0.88 + (0.28 * t);
  document.querySelector(".sun-orb").style.background = `
      radial-gradient(circle, 
        rgb(${center},${center},${center} 0%), 
        rgb(${r},${g},${b}) 45%),
        rgba(${r},${g},${b}, 0.65) 60%),
        transparent 80%)`;
  document.querySelector(".sun-orb").style.brightness = 0.7 + (0.3 * t);
  document.querySelector(".sun-orb").style.boxShadow = `0 0 ${glowSize}px rgba(${r},${g},0, ${glowOpacity})`;
  document.querySelector(".sun-orb").style.transform = `scale(${scale})`;
  document.querySelector(".light-ray").style.opacity = 0.15 + (0.85 * t);
}

// ----------------------------------------------------------------------------------------------------------------------
// function to update all sensor values at regular intervals----------------------------------------------------------------



function updateSensorValues() {
    setInterval(() => {
        let waterLevel = Math.floor(Math.random() * 100);
        let waterTemp = (Math.random() * 50).toFixed(1);
        let waterTds = Math.floor(Math.random() * 1000);
        let waterMuddy = Math.floor(Math.random() * 100);
        let airPressure = Math.floor(Math.random() * 40) + 980; // 980-1020 hPa
        let airTemp = (Math.random() * 40 +10).toFixed(1); // 0-40 °C
        let airHumidity = Math.floor(Math.random() * 100);
        let airQuality = Math.floor(Math.random() * 300); // AQI 0-300  
        let rainChance = Math.floor(Math.random() * 100); // 0-100%
        let windSpeed = (Math.random() * 20).toFixed(1); // 0-20 m/s
        let sunlight = Math.floor(Math.random() * 100); // 0-100%
        setSunlight(sunlight);
        setWindSpeed(windSpeed);
        setRainfall(rainChance);
        setHumidity(airHumidity);
        setAQI(airQuality);
        setAirTemp(airTemp);
        setAirPressure(airPressure);
        setTurbidity(waterMuddy);
        setTDS(waterTds);
        setWaterTemp(waterTemp);
        setWaterLevel(waterLevel);
    }, 5000); // Update every 1 second
}