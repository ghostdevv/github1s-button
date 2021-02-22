chrome.browserAction.onClicked.addListener(async function (tab) {
    const isValidURL = validURL(tab.url);

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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const isValidURL = validURL(tab.url);

    if (isValidURL) {
        setIcon('active', tabId);
    }
});

function setIcon(type, tabId) {
    chrome.browserAction.setIcon({
        tabId,
        path: {
            16: '../assets/16-' + type + '.png',
            32: '../assets/32-' + type + '.png',
            64: '../assets/64-' + type + '.png',
            128: '../assets/128-' + type + '.png',
        },
    });
}

function validURL(url) {
    return url.match(/^(http(s)?):\/\/(?:github|github1s).com/gm);
}
