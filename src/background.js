chrome.browserAction.onClicked.addListener(async function (tab) {
    if (tab.url.match(/^(http(s)?):\/\/github1s.com/gm))
        return chrome.browserAction.setPopup({
            popup: `src/views/is-github1s.html`,
            tabId: tab.id,
        });

    if (!tab.url.match(/^(http(s)?):\/\/github.com/gm))
        return chrome.browserAction.setPopup({
            popup: `src/views/not-github.html`,
            tabId: tab.id,
        });

    const basepath = tab.url.replace(/^(http(s)?):\/\/github.com/gm, '');

    chrome.tabs.update(tab.id, {
        url: 'https://github1s.com' + basepath,
    });
});
