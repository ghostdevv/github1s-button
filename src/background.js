chrome.browserAction.onClicked.addListener(async function (tab) {
    const isValidURL = tab.url.match(
        /^(http(s)?):\/\/(?:github|github1s).com/gm,
    );

    if (!isValidURL)
        return chrome.browserAction.setPopup({
            popup: `src/views/not-github.html`,
            tabId: tab.id,
        });

    const basepath = tab.url.replace(
        /^(http(s)?):\/\/(?:github|github1s).com/gm,
        '',
    );

    if (tab.url.match(/^(http(s)?):\/\/github1s.com/gm)) {
        chrome.tabs.update(tab.id, {
            url: 'https://github.com' + basepath,
        });
    } else {
        chrome.tabs.update(tab.id, {
            url: 'https://github1s.com' + basepath,
        });
    }
});
