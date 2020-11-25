const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
      mainWindow = new BrowserWindow({
          width: 350,
          height: 410,
          frame: false,
          transparent: true,
          webPreferences: {
              preload: path.join(__dirname, 'preload.js')
      }
  })

    mainWindow.loadFile('./src/index.html')
    mainWindow.setResizable(false)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})