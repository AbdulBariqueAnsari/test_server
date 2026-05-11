


// --- 5. System Logic ---
function restartDevice() {
    
    showModal('RESTART', onConfirmRestart);
    
    function onConfirmRestart() {
        
        fetchRestart(onRecieveFetchRestartResponse);
        function onRecieveFetchRestartResponse(data, error = false) {
            if (error) {//failed response case to be handled here
                showToast(data, "restartError", "rgb(255, 111, 111)", 5000);
                return;
            }
            showToast("Restarting in 5 sec", "restartError", "rgb(111, 161, 255)", 5000);
            
            setTimeout(() => {
                location.reload();
            }, 5000);
            
        }
    }
    
}

function factoryReset() {
    
    showModal('RESET', () => {
        fetchReset((data, error = false) => {
            if(error) {
                showToast(data, "resetError", "rgb(255, 111, 111)", 5000);
                return;
            }
            
            showToast("Reseting in 5 sec", "resetError", "rgb(111, 161, 255)", 5000);
        })
    });
    
    
}



function upload(url, fileInputId) {

    const file = document.getElementById(fileInputId).files[0];
    if (!file) {
       // alert("Select file first!");
        showToast("Please Select a file first", "UploadError");
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);

    const progressBox = document.getElementById("progressBox");
    const progressBar = document.getElementById("progressBar");
   // const statusText = document.getElementById("statusText");

    // Reset UI
   /* requestAnimationFrame(() => {
      progressBox.classList.add("show");
    });*/
    progressBox.classList.add("show");
    progressBar.style.width = "20%";
    progressPercent.innerHTML = "0%";

    // 🔵 START
    xhr.upload.onloadstart = () => {
       // statusText.innerHTML = "Upload started...";
        showToast("Uploading file", "UploadError", "rgb(111, 161, 255)", 3000);
        console.log('Upload:Start');
    };

    // 🟡 PROGRESS
    xhr.upload.onprogress = (e) => {
        console.log('Upload:On Progress');
        if (e.lengthComputable) {
            let percent = Math.round((e.loaded / e.total) * 100);

            progressBar.style.width = percent + "%";
            progressPercent.innerHTML = percent + "%";
            const text = "Uploading... " + percent + "%";
            showToast(text, "UploadError", "rgb(255, 229, 111)", 3000);
        }
    };

    // 🟢 SUCCESS
    xhr.onload = () => {
        console.log('Upload:onLoad');
        if (xhr.status === 200) {
            progressBar.style.width = "100%";
            progressPercent.innerHTML = "100%";
            showToast("Upload Successful ✅", "UploadError", "rgb(111, 255, 111)", 5000);

            //statusText.innerHTML = "Upload Success ✅";

            // optional auto hide after 3 sec
            setTimeout(() => {
                progressBox.classList.remove("show");
            }, 3000);

        } else {
            //statusText.innerHTML = "Upload Failed ❌";
            showToast("Upload Failed ❌", "UploadError", "rgb(255, 111, 111)", 5000);
            setTimeout(() => {
                progressBox.classList.remove("show");
            }, 3000);
        }
    };

    // 🔴 ERROR
    xhr.onerror = () => {
        console.log('Upload:onError');
        //statusText.innerHTML = "Error ❌";
        showToast("Error on uploading ❌", "UploadError", "rgb(255, 111, 111)", 5000);
        setTimeout(() => {
                progressBox.classList.remove("show");
            }, 3000);
    };

    // ⚫ ABORT
    xhr.onabort = () => {
        console.log('Upload:Abort');
        //statusText.innerHTML = "Aborted ⚠️";
        showToast("Upload Aborted ⚠️", "UploadError", "rgb(111, 185, 255)", 5000);
        setTimeout(() => {
                progressBox.classList.remove("show");
            }, 3000);
    };

    xhr.open("POST", url, true);
    xhr.send(formData);
}



// --- 6. Upload Logic ---
function uploadFirmware() {
    upload("/upload", "firmware-file");
}

function uploadFS() {
    upload("/upload", "filesystem-file");
}
