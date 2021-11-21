import RGBToHSL from './helpers/RGBToHSL';
import RGBToHex from './helpers/RGBToHex';

const generateFile = (payload: any): void => {
  postMessages({
    type: 'downlooad-file',
    payload: `:root {\r\n${convertPaintStyles(figma.getLocalPaintStyles())}}`,
  });
};

const convertPaintStyles = (styles: any) => {
  let vars = '';

  styles.forEach((style: any, index: number) => {
    // TODO: check gradients, opcity, ...
    const { r, g, b } = style.paints[0].color;
    // TODO: hex in comment
    // TODO: color names
    vars += `--color-${index}-hsl: ${RGBToHSL(r, g, b)}; // ${RGBToHex(r, g, b)} \r\n`;
  });

  return vars;
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
