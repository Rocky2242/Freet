// Modules to control application life and create native browser window
require('./socketIOServer.js')
const {app, BrowserWindow, session, protocol} = require('electron')
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

const serve = require('electron-serve')
const loadURL = serve({directory: '.'});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      webSecurity: false
    } 
  })

  session.defaultSession.webRequest.onBeforeSendHeaders(['*://*./*'], function(details, callback) {
    if(details.url.includes('jio.com')) {
      if(details.url.includes('.key'))
        details.requestHeaders['User-Agent'] = 'JioTv'
      else
        details.requestHeaders['User-Agent'] = 'JioTV/1.0.4 Adobe Primetime/2.5 ExoPlayerDemo/2.0 (Linux;Android 5.0.1) ExoPlayerLib/2.7.3/19.0 (Linux;Android 6.0.1) ExoPlayerLib/2.7.2'
    }
    callback({cancel: false, requestHeaders: details.requestHeaders})
  })

  loadURL(mainWindow)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
      mainWindow = null
  })
}

  app.on('ready', createWindow)

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
