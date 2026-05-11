
/* all responses in thw endpoinst are json body 
 * when device found any error in response .. or manupulating setting
 * its send response with status fail, and main part in response. body
 */



const apiEndpoints = {
    SENSOR_DATA: '/sensor-data',
    GET_CONFIG: '/get-config',
    SAVE_CONFIG: '/save-config',
    GET_SSID_LIST: '/get-ssid-list',
    RESET: '/reset',
    RESTART: '/restart',
    DEVICE_INFO: '/device-info'
};

const responseType = {
    FAIL : 'FAIL',
    GOOD : 'GOOD',
    WORK : 'WORK',
    IDLE : 'IDLE'
}

//base api function
async function fetchUrl(api, options = {}) {
    try {
        const response = await fetch(api, options);
        if (!response.ok) { // its means not 200 response code
            throw new Error(`Unsupported Response Code: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            try {
                const data = await response.json();
                return data;
            } catch (err) {
                throw new Error('Invalid JSON body response');
            }
        } else throw new Error(`Unsupported Content Type`);
    } catch (err) {
        throw err;
    }
}

// get config api
async function fetchConfig(callback) {
    try {
        const data = await fetchUrl(apiEndpoints.GET_CONFIG);
        callback(data);
    } catch (error) {
        callback(error.message, true);
    }
}

// savecomfig api.. for saving settings
async function fetchSave(callback, postData) {
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    }
    
    try {
        const data = await fetchUrl(apiEndpoints.SAVE_CONFIG, options);
        if (data.status === responseType.FAIL) {
            callback(data.message, true);
        } else if (data.status === responseType.GOOD) {
            callback(data.message);
        }
    } catch (error) {
        callback(error.message, true);
    }
}



let fetchingStatus;
async function fetchStatus(callback, errorCallback){
  if (fetchingStatus) return;
  fetchingStatus = true;
  try {
    const data = await fetchUrl(apiEndpoints.status);
    callback(data);
  } catch (err) {
    errorCallback(err);
  }
  fetchingStatus = false;
}

async function fetchReset(callback) {
    
    try {
        const data = await fetchUrl(apiEndpoints.RESET);
        
        if (data.status === responseType.FAIL) {
            callback(data.message, true);
            
        } else if (data.status === responseType.GOOD) {
            callback(data.message);
        }
    } catch (error) {
        callback(error.message, true);
    }
}

async function fetchRestart(callback) {
    try {
        const data = await fetchUrl(apiEndpoints.RESTART);
        if (data.status === responseType.GOOD) {
            callback(data.message);
        }
    } catch (error) {
        callback(error.message, true);
    }
}


let fetchingSensorData = false;
async function fetchSensorData(callback){
  if (fetchingSensorData) return;
  fetchingSensorData = true;
  try {
    const data = await fetchUrl(apiEndpoints.SENSOR_DATA);
    callback(data);
  } catch (err) {
    callback(err, true);
  }
  fetchingSensorData = false;
}

async function fetchSsids(callback, errorCallback){
  try {
    const res = await fetchUrl(apiEndpoints.ssids);
    if (res.status === 'failed'){
      errorCallback(new Error(res.message), 2);
    } else if (res.status === 'working') {
      errorCallback(new Error(res.message), 1);
      setTimeout(fetchSsids, 2500, callback, errorCallback);
    } else if (res.status === 'info') {
      errorCallback(new Error(res.message), 0);
    } else if (res.status === 'success') {
      callback(res.ssids);
    }
  } catch (err) {
    errorCallback(err, 2);
  }
}



