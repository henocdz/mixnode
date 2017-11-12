const path = require('path')
const url = require('url')
const electron = require('electron')
const {BrowserWindow} = electron

// global reference to Main Window
let _window

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

// TODO: replace with ENV VAR
const index = IS_DEVELOPMENT ? process.env.DEV_URL : url.format({
  pathname: path.join(__dirname, '../../build', 'index.html'),
  protocol: 'file:',
  slashes: true
})


module.exports = function () {
  // avoid overriding instance app
  if(_window !== undefined) return

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  _window = new BrowserWindow({
    x: 0,
    y: 0,
    width: width,
    height: height,
    minWidth: 800,
    minHeight: 640,
    center: true,
    frame: false,
    icon: path.join(__dirname, '../..', 'public/icons/mixnode_64x64.png')
  })

  _window.loadURL(index)
  IS_DEVELOPMENT && _window.webContents.openDevTools()

  _window.on('closed', function () {
    _window = null
  })
}
