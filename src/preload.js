const path = require('path');
const url = require('url');

const customTitlebar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#232529'),
        icon: url.format(path.join(__dirname, '/img/icon.png')),
        maximizable: false,
        menu: null,
        titleHorizontalAlignment: "left"
    });

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})