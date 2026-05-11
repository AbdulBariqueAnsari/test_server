//const { staSsid, staPassword, wifiName, mdnsHostname, apSsid, apPassword } = elements;

const validators = {

  // ---------- WiFi ----------
  staSsid: () => {
    const value = staSsid.value.trim();
    if (!value) return 'SSID Cannot be empty.';
    if (value.length > 32) return 'Maximum 32 characters allowed.';
    return '';
  },

  staPassword: () => {
    const value = staPassword.value;
    if (!value) return 'Password Cannot be empty.';
    if (value.length < 8) return 'Minimum 8 characters required.';
    if (value.length > 32) return 'Maximum 32 characters allowed.';
    return '';
  },

  apSsid: () => {
    const value = apSsid.value.trim();
    if (!value) return 'AP SSID Cannot be empty.';
    if (value.length > 32) return 'Maximum 32 characters allowed.';
    return '';
  },

  apPassword: () => {
    const value = apPassword.value;
    if (value.length && value.length < 8) return 'Minimum 8 characters required.';
    if (value.length > 32) return 'Maximum 32 characters allowed.';
    return '';
  },

  wifiName: () => {
    const value = wifiName.value.trim();
    if (!value) return 'WiFi name required.';
    if (value.length > 20) return 'Keep it short (max 20 chars).';
    return '';
  },

  mdnsHostname: () => {
    const value = mdnsHostname.value.trim();
    if (!value) return 'Hostname required.';
    if (!/^[a-zA-Z0-9\-]+$/.test(value)) return 'Only letters, numbers, hyphen allowed.';
    return '';
  },
/*
  // ---------- Tank ----------
  tankHeight: () => {
    const value = Number(tankHeight.value);
    if (!tankHeight.value) return 'Tank height required.';
    if (isNaN(value)) return 'Must be a number.';
    if (value < 20) return 'Minimum 20 cm.';
    if (value > 500) return 'Too large.';
    return '';
  },

  ultrasonicOffset: () => {
    const value = Number(ultrasonicOffset.value);
    if (!ultrasonicOffset.value) return 'Offset required.';
    if (isNaN(value)) return 'Must be a number.';
    if (value < 2) return 'Too small.';
    if (value > 50) return 'Too large.';
    return '';
  },

  // ---------- NTC ----------
  ntcBeta: () => {
    const value = Number(ntcBeta.value);
    if (!ntcBeta.value) return 'NTC Beta required.';
    if (isNaN(value)) return 'Invalid number.';
    if (value < 3000 || value > 4500) return 'Typical range: 3000–4500.';
    return '';
  },

  ntcR0: () => {
    const value = Number(ntcR0.value);
    if (!ntcR0.value) return 'NTC R0 required.';
    if (isNaN(value)) return 'Invalid number.';
    if (value < 1000 || value > 100000) return 'Check resistance value.';
    return '';
  },

  // ---------- Gas ----------
  mq135R0: () => {
    const value = Number(mq135R0.value);
    if (!mq135R0.value) return 'MQ135 R0 required.';
    if (isNaN(value)) return 'Invalid number.';
    if (value < 1 || value > 50) return 'Typical range: 1–50.';
    return '';
  },

  // ---------- Water ----------
  tdsR0: () => {
    const value = Number(tdsR0.value);
    if (!tdsR0.value) return 'TDS calibration required.';
    if (isNaN(value)) return 'Invalid number.';
    if (value < 0 || value > 1000) return 'Out of range.';
    return '';
  },

  turbidityFactor: () => {
    const value = Number(turbidityFactor.value);
    if (!turbidityFactor.value) return 'Required.';
    if (isNaN(value)) return 'Invalid number.';
    if (value < 0 || value > 5) return 'Typical: 0–5.';
    return '';
  },

  // ---------- Environment ----------
  ldrThreshold: () => {
    const value = Number(ldrThreshold.value);
    if (!ldrThreshold.value) return 'Required.';
    if (isNaN(value)) return 'Invalid.';
    if (value < 0 || value > 1023) return 'Range: 0–1023.';
    return '';
  },

  rainThreshold: () => {
    const value = Number(rainThreshold.value);
    if (!rainThreshold.value) return 'Required.';
    if (isNaN(value)) return 'Invalid.';
    if (value < 0 || value > 1023) return 'Range: 0–1023.';
    return '';
  },

  windFactor: () => {
    const value = Number(windFactor.value);
    if (!windFactor.value) return 'Required.';
    if (isNaN(value)) return 'Invalid.';
    if (value < 0.1 || value > 10) return 'Check factor.';
    return '';
  },

  // ---------- BME280 ----------
  pressureOffset: () => {
    const value = Number(pressureOffset.value);
    if (isNaN(value)) return 'Invalid.';
    if (value < -50 || value > 50) return 'Offset too large.';
    return '';
  },

  // ---------- AHT22 ----------
  humidityOffset: () => {
    const value = Number(humidityOffset.value);
    if (isNaN(value)) return 'Invalid.';
    if (value < -20 || value > 20) return 'Out of range.';
    return '';
  }*/
};




const fields = [
  { id: 'staSsid', element: staSsid, errorId: 'staSsidError' },
  { id: 'staPassword', element: staPassword, errorId: 'staPasswordError' },
  { id: 'apSsid', element: apSsid, errorId: 'apSsidError' },
  { id: 'apPassword', element: apPassword, errorId: 'apPasswordError' },
  { id: 'wifiName', element: wifiName, errorId: 'wifiNameError' },
  { id: 'mdnsHostname', element: mdnsHostname, errorId: 'mdnsHostnameError' },
/*
  { id: 'tankHeight', element: tankHeight, errorId: 'tankHeightError' },
  { id: 'ultrasonicOffset', element: ultrasonicOffset, errorId: 'ultrasonicOffsetError' },

  { id: 'ntcBeta', element: ntcBeta, errorId: 'ntcBetaError' },
  { id: 'ntcR0', element: ntcR0, errorId: 'ntcR0Error' },

  { id: 'mq135R0', element: mq135R0, errorId: 'mq135R0Error' },
  { id: 'tdsR0', element: tdsR0, errorId: 'tdsR0Error' },
  { id: 'turbidityFactor', element: turbidityFactor, errorId: 'turbidityFactorError' },

  { id: 'ldrThreshold', element: ldrThreshold, errorId: 'ldrError' },
  { id: 'rainThreshold', element: rainThreshold, errorId: 'rainError' },
  { id: 'windFactor', element: windFactor, errorId: 'windError' },

  { id: 'pressureOffset', element: pressureOffset, errorId: 'pressureError' },
  { id: 'humidityOffset', element: humidityOffset, errorId: 'humidityError' } */
];


function validateField(fieldId, element, errorId, autoHide = false, hideDuration = 3000) {
  
  //const errorDiv = document.getElementById(errorId);
  const errorMessage = validators[fieldId]();
  if (errorMessage) {
    element.classList.add('invalidInput');
    showToast(errorMessage, errorId);
  } else {
    requestAnimationFrame(() => {
      element.classList.remove('invalidInput');
    });
    removeToastItem(errorId);
  }
  return errorMessage;
}
