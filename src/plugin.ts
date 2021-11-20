function logHelloWorld(payload: any): void {
  console.log(payload.msg);
}

figma.ui.onmessage = function ({ type, payload }): void {
  switch (type) {
    case 'hello-world':
      logHelloWorld(payload);
      break;
  }
};

figma.showUI(__html__, { width: 300, height: 200 });
