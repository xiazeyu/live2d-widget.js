import { config } from '../config/configMgr';
import { L2Dwidget } from '../index';

document.head.innerHTML += `
<style>
  .live2d-widget-dialog-container {
    width: 300px;
    height: 120px;
    position: absolute;
    bottom: 65%;
    right: 0px;
    transform-origin: right;
    padding: 12px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  .live2d-widget-dialog {
    width: 100%;
    height: 100%;
    color: #917159;
    font-size: 16px;
    padding: 12px;
    border: 2px solid rgb(236, 203, 180);
    background: rgb(252, 248, 244);
    box-sizing: border-box;
    border-radius: 10px;
    transform: rotate(-2deg);
    opacity: 0;
    transition: 200ms opacity;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    animation: live2d-widget-dialog-tingle 4s ease-in-out 0s infinite alternate;
  }
  @keyframes live2d-widget-dialog-tingle {
    0% { transform: translate(-1px, 1.5px) rotate(-2deg); }
    100% { transform: translate(1px, -1.5px) rotate(2deg); }
  }
</style>
`;

let containerElement,dialogElement,closeTimer;

/**
 * 创建对话框元素
 * @param {HTMLElement} root 位置
 */
function createDialogElement(root) {
  containerElement = document.createElement('div');
  containerElement.className = 'live2d-widget-dialog-container';
  containerElement.style.transform = `scale(${config.display.width / 250})`
  dialogElement = document.createElement('div');
  dialogElement.className = 'live2d-widget-dialog';
  containerElement.appendChild(dialogElement);
  root.appendChild(containerElement);

  L2Dwidget.emit('create-dialog', containerElement);

  if (config.dialog.hitokoto)
    showHitokotoLoop()
}

function displayDialog() {
  dialogElement.style.opacity = 1;
}

function hiddenDialog() {
  dialogElement.style.opacity = 0;
}

function alertText(text) {
  displayDialog();
  dialogElement.innerText = text;
  clearTimeout(closeTimer);
  closeTimer = setTimeout(function () {
    hiddenDialog();
  }, 5000);
}

function showHitokotoLoop() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://v1.hitokoto.cn');
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alertText(data.hitokoto);
      setTimeout(showHitokotoLoop, 10000)
    }
  }
  xhr.send();
}


module.exports = {
  createDialogElement, displayDialog, hiddenDialog, alertText, showHitokotoLoop
}