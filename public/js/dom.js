

function initializeDOM() {

    setupWaterLevelWave();
    updateSensorValues();
    
   // setupTogglePassword();
    
    setWifiMode(state.configData.WIFI_CONFIG.WIFI_MODE);
    wifiMode.onclick = () => {
        let isSTA = wifiMode.dataset.value === 'STA' ? true : false;
        isSTA = !isSTA;
        setWifiMode(isSTA ? 'STA' : 'AP');
    }
    
    document.addEventListener('click', onClickDocument);
    

    
    fields.forEach((field) => {
        field.element.addEventListener('input', () => {
            validateField(field.id, field.element, field.errorId);
        });
        field.element.addEventListener('focus', () => {
            validateField(field.id, field.element, field.errorId);
        });
        field.element.addEventListener('blur', () => {
            validateField(field.id, field.element, field.errorId);
        });
    });
}


function getWifiMode() {
    return wifiMode.dataset.value;
}

function setWifiMode(mode) {
    
    const clientText = document.getElementById("leftText");
    const apText = document.getElementById("rightText");
    
    const apFields = document.getElementById("apFields");
    const staFields = document.getElementById("staFields");

    const leftSpanText = document.getElementById("left-span-text");
    const rightSpanText = document.getElementById("right-span-text");
    

    if (mode === 'STA') {
        wifiMode.classList.remove("ap");
        wifiMode.classList.add("sta");
        
        wifiMode.dataset.value = 'STA';
        
        clientText.classList.add("mode-text-active");
        apText.classList.remove("mode-text-active");
        
        staFields.style.maxHeight = "300px";
        apFields.style.maxHeight = "0px";
        staFields.style.opacity = "1";
        apFields.style.opacity = "0";
        
    } else if (mode === 'AP') {
        wifiMode.classList.remove("sta");
        wifiMode.classList.add("ap");
        
        wifiMode.dataset.value = 'AP';
        
        clientText.classList.remove("mode-text-active");
        apText.classList.add("mode-text-active");
        
        staFields.style.maxHeight = "0px";
        apFields.style.maxHeight = "150px";
        staFields.style.opacity = "0";
        apFields.style.opacity = "1";
    }

}

function onClickDocument(e){
 
}

