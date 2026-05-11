


const modals = {
  SAVE : [ "Save Settings", 'Are you sure you want to save these settings?<br>This page may not work after device restart', "💾" ] ,
  RESET : [ "Reset Device", "Are you sure you want to reset the device?<br>This action cannot be undone.", "🧹"],
  RESTART : ["Restart Device", "Are you sure you want to restart the device?", "♻️" ]
}

function showModal(modalType, onConfirm) {
  
 // const { modal, modalTitle, modalMessage, modalOverlay, modalContent, modalCancel, modalConfirm } = elements;
  //console.log('showModal:', modalType);
  
  if (!modal || !modalTitle || !modalMessage || !modalOverlay || !modalContent) {
    console.error('Modal elements missing:', {
      modal: !!modal,
      modalTitle: !!modalTitle,
      modalMessage: !!modalMessage,
      modalOverlay: !!modalOverlay,
      modalContent: !!modalContent
    });
    return;
  }
  
  if (modals[modalType]) {
    modalMessage.innerHTML = modals[modalType][1];
    modalTitle.innerHTML = `<span>${modals[modalType][2]}</span> ${modals[modalType][0]}`;
  } else console.log("No such modal type found");
  
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
  
  requestAnimationFrame(() => {
      modalOverlay.classList.add('fade-in');
      modalContent.classList.add('scale-in');
  });

  const closeModal = () => {
    
    modalOverlay.classList.remove('fade-in');
    modalContent.classList.remove('scale-in');
    
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      modal.style.display = 'none';
      modalMessage.innerHTML = '';
    }, 500);
    
  };

  modalOverlay.onclick = closeModal;
  modalCancel.onclick = closeModal;
  modalConfirm.onclick = () => {
    console.log('Modal confirm clicked');
    onConfirm();
    closeModal();
  };
}



function showToast(message, toastId, toastColor = "rgb(255, 111, 111)", duration = 3000) {
  const box = document.getElementById("toastBox");

  if (!timeoutKeys[toastId]) {
    timeoutKeys[toastId] = [0, 0, 0];
  }
  
  if (box.children.length === 0) {
    box.classList.add("active");
  }
  
  const itemOld = document.getElementById(toastId);
  if (box.contains(itemOld)) {
    clearTimeout(timeoutKeys[toastId][0]);
    clearTimeout(timeoutKeys[toastId][1]);
    clearTimeout(timeoutKeys[toastId][2]);
    
    itemOld.classList.add("hide");
    itemOld.remove();
    
  }
  const item = document.createElement("div");
  item.id = toastId;
  item.className = "toast-item";
  item.style.color = toastColor;
  item.innerText = message;

  box.appendChild(item);

  timeoutKeys[toastId][0] = setTimeout(() => { item.classList.add("show"); }, 10);

  timeoutKeys[toastId][1] = setTimeout(() => {
    item.classList.add("hide");

    timeoutKeys[toastId][2] = setTimeout(() => {
      item.remove();
      if (box.children.length === 0) {
        box.classList.remove("active");
      }

    }, 250);

  }, duration);
}

function removeToastItem(toastId) {
  const box = document.getElementById("toastBox");

  if (!timeoutKeys[toastId]) timeoutKeys[toastId] = [0, 0, 0];
  
  const itemOld = document.getElementById(toastId);
  if (box.contains(itemOld)) {
    clearTimeout(timeoutKeys[toastId][0]);
    clearTimeout(timeoutKeys[toastId][1]);
    clearTimeout(timeoutKeys[toastId][2]);
    itemOld.classList.add("hide");
    itemOld.remove();
    if (box.children.length === 0) box.classList.remove("active");
  }
}


let timeoutKeys = {
  staSsidError : [0,0,0],
  apSsidError : [0,0,0],
  staPasswordError : [0,0,0],
  apPasswordError : [0,0,0],
  wifiNameError : [0,0,0],
  mdnsHostnameError : [0,0,0]
}
