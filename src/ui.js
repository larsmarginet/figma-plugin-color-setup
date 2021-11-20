import './ui.css';

const postMessage = (type, payload) => {
  parent.postMessage({ pluginMessage: { type, payload } }, '*');
};

const buttonListeners = () => {
  document.addEventListener('click', function (event) {
    const target = event.target;

    switch (target.id) {
      case 'helloWorld':
        postMessage('hello-world', {
          msg: 'hello world 👋',
        });
        break;
    }
  });
};

buttonListeners();
