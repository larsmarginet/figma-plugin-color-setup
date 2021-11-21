import namer from 'color-namer';

import RGBToHSL from './helpers/RGBToHSL';
import RGBToHex from './helpers/RGBToHex';

const generateFile = (): void => {
  const colors = convertPaintStyles(figma.getLocalPaintStyles());

  const variables = generateVariables(colors);

  postMessages({
    type: 'downlooad-file',
    payload: `:root {\r\n${variables}}`,
  });
};

const convertPaintStyles = (styles: any) => {
  const colors: any = [];

  styles.forEach((style: any) => {
    // TODO: check gradients, opcity, ...
    const paint = style.paints[0];
    const type = paint.type;

    if (type !== 'SOLID') {
      return;
    }

    const { r, g, b } = paint.color;

    const hex = RGBToHex(r, g, b);

    if (isColorAllreadyPresent(colors, hex)) {
      return;
    }

    const hsl = RGBToHSL(r, g, b);
    const hslCode = ` hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const names = namer(hex).basic;

    let name = names.reduce((min, name) => (min.distance < name.distance ? min : name)).name;

    // color name corrections
    if (hex === '#ffffff' || hex === '#000000') name = 'neutral';
    if (name === 'white' || name === 'black') name = 'gray';

    colors.push({
      name,
      hsl: hslCode,
      l: hsl.l,
      hex,
    });
  });

  return colors.sort((a: any, b: any) => {
    if (a.name === b.name) {
      return a.l < b.l ? -1 : 1;
    } else {
      return a.name < b.name ? -1 : 1;
    }
  });
};

const isColorAllreadyPresent = (colors: any, hex: string) => {
  return (
    colors.filter((color: any) => {
      return color.hex === hex;
    }).length > 0
  );
};

const generateVariables = (colors: any) => {
  let variables: any = '';

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const nextColor = colors[i + 1];
    variables += `$${color.name}-${color.l}-hsl: ${color.hsl}; // ${color.hex} \r\n${
      nextColor && nextColor.name !== color.name ? '\r\n' : ''
    }`;
  }

  return variables;
};

// send messgages to ui.js
const postMessages = ({ type, payload }: any): void => {
  figma.ui.postMessage({ type, payload });
};

// listen for messages from ui.js
figma.ui.onmessage = ({ type, payload }): void => {
  switch (type) {
    case 'generate-file':
      generateFile();
      break;
  }
};

// create the ui window
figma.showUI(__html__, { width: 300, height: 200 });
