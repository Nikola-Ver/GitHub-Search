let storage = localStorage.getItem('storage')
  ? JSON.parse(localStorage.getItem('storage'))
  : [];

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    text = text.replace(' ', '+');
    const deleteVal = text.match(/del\+|.+/g);
    let url = '';

    if (deleteVal && deleteVal[0] === 'del+') {
      storage = storage.filter((e) => e !== deleteVal[1]);
      localStorage.setItem('storage', JSON.stringify(storage));
      return;
    }

    if (text.match(/\//g)) {
      url = `https://github.com/${text}`;
    } else {
      url = `https://github.com/search?q=${text}`;
    }

    if (storage.findIndex((e) => e === text) === -1) {
      storage.push(text);
      localStorage.setItem('storage', JSON.stringify(storage));
    }

    chrome.tabs.update(tab.id, { url });
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const suggestArr = storage
    .filter((e) => e.indexOf(text) > -1)
    .map((e) => {
      return { content: e, description: e };
    });

  suggest(suggestArr);
});
