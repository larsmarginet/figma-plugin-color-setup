import './ui.css';
import { saveAs } from 'file-saver';

const downloadFile = (payload) => {
  let variables = '';
  payload.map((item) => (variables += `${item.var}: ${item.value};`));

  const content = `:root {${variables}}`;
  const filename = 'colors.scss';
  const blob = new Blob([content], {
    type: 'text/plain;charset=utf-8',
  });

  saveAs(blob, filename);
};

// send messages to plugin.ts
const postMessage = (type, payload) => {
  parent.postMessage({ pluginMessage: { type, payload } }, '*');
};

// listen for messages from plugin.ts
const messageListener = () => {
  window.onmessage = (e) => {
    const pluginMessage = e.data.pluginMessage;
    const { type, payload } = pluginMessage;

    switch (type) {
      case 'downlooad-file':
        downloadFile(payload);
        break;
    }
  };
};

// listen to click events of user
const clickListeners = () => {
  document.addEventListener('click', (event) => {
    const target = event.target;

    switch (target.id) {
      case 'generateFile':
        postMessage('generate-file');
        break;
    }
  });
};

clickListeners();
messageListener();
