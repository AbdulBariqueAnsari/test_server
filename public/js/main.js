
// --- 1. Navigation Logic ---
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active-nav'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active-nav');

    clearInterval(sensorUpdateInterval);
    clearInterval(aboutInfoUpdateInterval);

    if(tabId === 'sensors') {
        document.querySelector(".status-dot").classList.add("loading");
        sensorUpdateInterval = setInterval(() => {
            fetchSensorData(onRecieveSensorData);
        }, 5000);
        fetchSensorData(onRecieveSensorData);
    } else if(tabId === 'settings') {
        // updateDashboard();
    } else if(tabId === 'about') {
        document.querySelector(".status-dot").classList.add("loading");
        aboutInfoUpdateInterval = setInterval(() => {
            fetchStatus(onRecieveStatus);
        }, 10000);
        fetchStatus(onRecieveStatus);
    }
}

// --- 2. Dashboard Animation Logic ---
let sensorUpdateInterval, aboutInfoUpdateInterval;
function onRecieveSensorData(data, isError = false) {
    if(isError) {
        console.error('Error fetching sensor data:', data);
        
        // code for setting error after 1 min of error

        if (errorAttemptCount < 3) {
            errorAttemptCount++;
        } else {
            document.querySelector(".status-dot").classList.remove("loading");
            document.querySelector(".status-dot").classList.add("error");
        }
        return;
    }
    document.querySelector(".status-dot").classList.remove("error");
    errorAttemptCount = 0;
    const { waterLevel, waterTemp, waterTds } = data;

    setTDS(waterTds);
    setWaterTemp(waterTemp);
    setWaterLevel(waterLevel);
}

let errorAttemptCount = 0;


function onRecieveStatus(data, isError = false) {
    if(isError) {
        console.error('Error fetching status:', data);
        document.querySelector(".status-dot").classList.add("error");
        return;
    }
    // Update status indicators based on data
}

// initial function after load
window.onload = function() {
  
  if (window.location.protocol !== 'https:') {
    console.warn('Warning: Page is not served over HTTPS. Passwords may be exposed.');
  }
  
  initializeDOM();
  switchTab('sensors', document.querySelector('.nav-item'));
  //initializeTankStatus();
  //initializeForm();
  
};

// holder for various parameters
let state = { 
    ssids: [],
  
    configData: { 
        WIFI_CONFIG : {
            WIFI_MODE : 'STA',
            STA_SSID : 'Aira', 
            STA_PASS : 'Aira@2012',
            AP_SSID : 'esp',
            AP_PASS : 'pass1234',
            WIFI_NAME : 'Esp-Multi-sensor',
            MDNS_NAME : 'espmultisensor'
        },
        SENSOR_CALIBRATION : {
            TANK_DEPTH : 100,
            US_OFFSET : 10,
        }
    }
};


// elements 

const wifiMode = document.getElementById('wifi-mode');
const staSsid = document.getElementById('sta-ssid');
const staPassword = document.getElementById('sta-pass');
const wifiName = document.getElementById('wifi-name');
const mdnsHostname = document.getElementById('mdns-hostname');
const apSsid = document.getElementById('ap-ssid');
const apPassword = document.getElementById('ap-pass');/*
  tankDepth: document.getElementById('tankDepth'),
  sensorOffset: document.getElementById('sensorOffset'),
  
  ssidsError: document.getElementById('ssidsError'),*/
  /*
  ssidError: document.getElementById('ssidError'),
  passwordError: document.getElementById('passwordError'),
  tankDepthError: document.getElementById('tankDepthError'),
  sensorOffsetError: document.getElementById('sensorOffsetError'),
  */
  
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalIcon = document.getElementById('modalIcon');
const modalMessage = document.getElementById('modalMessage');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
    
/*
  serverResponse: document.getElementById('serverResponse'),
  restartBtn: document.getElementById('restartBtn'),
  resetBtn: document.getElementById('resetBtn')*/



