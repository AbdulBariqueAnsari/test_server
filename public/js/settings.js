



function initializeForm() {
  updateFormData();

  //elements.form.addEventListener('submit', onClickSubmitButton);
  //  const resetButton = elements.form.querySelector('button[type="reset"]');
  // resetButton.addEventListener('click', resetFields);

}

function saveSettings() {

  const errors = [];

  fields.forEach((field) => {
    const errorMessage = validators[field.id]();//validateField(field.id, field.element, field.errorId);

    if (errorMessage) {
      field.element.classList.add('invalidInput');
      errors.push(errorMessage)
    } else {
      requestAnimationFrame(() => {
        field.element.classList.remove('invalidInput');
      });
      removeToastItem(field.errorId);
    }
  });

  if (errors.length > 0) {
    //console.log('Form errors found:', errors);
    // showServerResponse('Please fix form errors before saving', 'error');
    showToast("Please Fix Form Error(s) Before Saving", 'formError');
    return;
  }

  /*if (Number(tankDepth.value) < Number(sensorOffset.value) + 10) {
  console.log('Form errors found:', errors);
  showServerResponse('Tank Depth value must be greater than Sensor Offset value by 10', 'error', 5000);
  return;
  }*/

  showModal('SAVE', onSaveCallback);

}

function onSaveCallback() {

  const newData = {
    'WIFI_CONFIG': {
      'WIFI_MODE': wifiMode.dataset.value,
      'STA_SSID': staSsid.value,
      'STA_PASS': staPassword.value,
      'AP_SSID': apSsid.value,
      'AP_PASS': apPassword.value,
      'WIFI_NAME': wifiName.value,
      'MDNS_NAME': mdnsHostname.value
    },
    'SENSOR_CALIBRATION': {
      //    'TANK_DEPTH' : tankDepth.value,
      //    'US_OFFSET' : usOffset.value
    }
  }

  fetchSave(onRecieveFetchSaveResponse, newData);

  function onRecieveFetchSaveResponse(data, error = false) {
    if (error) {//failed response case to be handled here
      showToast(data, "saveConfig","rgb(255, 111, 111)", 5000);
      return;
    }
    showToast("Configuration saved Successfully", "saveConfig", "rgb(111, 255, 111)", 5000);
    setTimeout(() => {
      location.reload();
    }, 5000);

  }
}

function updateFormData() {
  fetchConfig(onRecieveFetchConfigResponse);
  function onRecieveFetchConfigResponse(data, error = false) {
    if (error) {//failed response case to be handled here
      showToast(data, "getConfig", "rgb(255, 111, 111)", 5000);
      return;
    }

    Object.assign(state.configData, data);

    // state me config data update hpne k baad bss fields ko 
    //state.cofig data k hissabe se update karna h

    updateSettingFields();

    showToast("Configuration Loaded Successfully", "getConfig", "rgb(111, 255, 111)", 5000);
  }
}

function updateSettingFields() {

  setWifiMode(state.configData.WIFI_CONFIG.WIFI_MODE);
  staSsid.value = state.configData.WIFI_CONFIG.STA_SSID;
  staPassword.value = state.configData.WIFI_CONFIG.STA_PASS;
  apSsid.value = state.configData.WIFI_CONFIG.AP_SSID;
  apPassword.value = state.configData.WIFI_CONFIG.AP_PASS;
  wifiName.value = state.configData.WIFI_CONFIG.WIFI_NAME;
  mdnsHostname.value = state.configData.WIFI_CONFIG.MDNS_NAME;
}

function resetFields() {

  updateSettingFields();

  fields.forEach((field) => {
    validateField(field.id, field.element, field.errorId);
  });
  showToast("Input Field data reset to last know values.", "resetFields", "rgb(111, 255, 111)", 3000);
}