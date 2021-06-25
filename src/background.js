chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    text = text.replace(' ', '+');
    let url = '';

    if (text.match(/\//g)) {
      url = `https://github.com/${text}`;
    } else {
      url = `https://github.com/search?q=${text}`;
    }

    chrome.tabs.update(tab.id, { url });
  });
});
