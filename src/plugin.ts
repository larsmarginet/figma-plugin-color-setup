const generateFile = (payload: any): void => {
  postMessages({
    type: 'downlooad-file',
    payload: [
      { var: '--color-primary', value: '#ffffff' },
      { var: '--color-secondary', value: '#000000' },
    ],
  });
};

// send messgages to ui.js
const postMessages = ({ type, payload }: any): void => {
  figma.ui.postMessage({ type, payload });
};

// listen for messages from ui.js
figma.ui.onmessage = ({ type, payload }): void => {
  switch (type) {
    case 'generate-file':
      generateFile(payload);
      break;
  }
};

// create the ui window
figma.showUI(__html__, { width: 300, height: 200 });
